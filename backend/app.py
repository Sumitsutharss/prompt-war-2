# app.py — VoteIQ India Backend
# PromptWars Virtual Challenge 2 — Sumit Suthar

from flask import Flask, request, jsonify, send_from_directory
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
from flask_cors import CORS
import google.generativeai as genai
import uuid, os, json, logging, re, html
from functools import lru_cache
from datetime import datetime

# ── Optional Google Cloud imports (graceful fallback for local dev) ────────────
try:
    from google.cloud import firestore as _firestore
    from google.cloud import secretmanager as _secretmanager
    import google.cloud.logging as cloud_logging
    _GCP_AVAILABLE = True
except ImportError:
    _GCP_AVAILABLE = False

# ── App init ──────────────────────────────────────────────────────────────────
app = Flask(__name__, static_folder='../frontend', static_url_path='')

# Security headers (Flask-Talisman)
Talisman(
    app,
    content_security_policy={
        'default-src': ["'self'"],
        'script-src':  ["'self'", 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net',
                         'fonts.googleapis.com', "'unsafe-inline'"],
        'style-src':   ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', "'unsafe-inline'"],
        'font-src':    ['fonts.gstatic.com', 'fonts.googleapis.com'],
        'img-src':     ["'self'", 'data:', 'https:'],
        'connect-src': ["'self'"],
    },
    force_https=False  # Cloud Run handles HTTPS termination
)

# CORS
CORS(app, origins=[os.getenv('ALLOWED_ORIGIN', '*')])

# Rate limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

# Logging
if _GCP_AVAILABLE and os.getenv('GCP_PROJECT'):
    try:
        cloud_logging.Client().setup_logging()
    except Exception:
        pass
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


# ── Secrets ───────────────────────────────────────────────────────────────────
def get_secret(secret_id: str) -> str:
    """Fetch from Secret Manager in prod; fall back to env var in dev."""
    if _GCP_AVAILABLE and os.getenv('GCP_PROJECT'):
        try:
            client = _secretmanager.SecretManagerServiceClient()
            name = f"projects/{os.getenv('GCP_PROJECT')}/secrets/{secret_id}/versions/latest"
            return client.access_secret_version(name=name).payload.data.decode()
        except Exception as e:
            logger.warning(f"Secret Manager unavailable: {e}. Falling back to env.")
    return os.getenv(secret_id.upper().replace('-', '_'), '')


# ── Gemini init ───────────────────────────────────────────────────────────────
GEMINI_API_KEY = get_secret('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY not set — AI chat will return errors.")

SYSTEM_PROMPT = """You are VoteIQ, an expert AI assistant for Indian election education.
Built for PromptWars 2026 by Google/Hack2Skill.

Your role:
- Educate citizens about India's democratic and electoral processes
- Answer questions about: voter registration, election procedures, political parties,
  current government, Constitution articles, EVM/VVPAT, Model Code of Conduct,
  Lok Sabha, Rajya Sabha, anti-defection law, upcoming elections, how to vote, NOTA

Your rules:
- Be FACTUAL, NEUTRAL, and EDUCATIONAL at all times
- Never express political opinions or partisan views
- Never say who someone should vote for
- Cite sources: "According to ECI", "As per Article 324", etc.
- Support both English and Hindi queries — respond in the same language used
- Keep answers concise (3-5 sentences) unless user asks for more detail
- For complex topics, use numbered lists for clarity
- Always end with a relevant follow-up suggestion

Key facts you know:
- Current PM: Narendra Modi (BJP, sworn in 9 June 2024, Modi 3.0)
- President: Droupadi Murmu | VP: C. P. Radhakrishnan
- CEC: Gyanesh Kumar (since Feb 2025)
- 2024 Lok Sabha: NDA 293, INDIA Alliance 234, Others 16 (Total: 543)
- Registered voters: 96.88 crore (Feb 2024 electoral roll)
- Voter helpline: 1950 | Registration: voters.eci.gov.in
- Lok Sabha seats: 543 | Rajya Sabha max: 245
- Majority in Lok Sabha: 272 seats
- 2024 election: 7 phases, 19 Apr – 1 Jun 2024, result 4 Jun 2024

If asked outside elections/democracy/Indian politics, politely redirect:
"I'm specialized in Indian election education. For that topic, please check official sources."
"""

_gemini_model = None

def get_model():
    global _gemini_model
    if _gemini_model is None and GEMINI_API_KEY:
        genai.configure(api_key=GEMINI_API_KEY)
        _gemini_model = genai.GenerativeModel(
            model_name='gemini-1.5-flash',
            system_instruction=SYSTEM_PROMPT,
            generation_config=genai.GenerationConfig(
                max_output_tokens=800,
                temperature=0.3,
                top_p=0.9,
            )
        )
    return _gemini_model


# ── Firestore init ────────────────────────────────────────────────────────────
_db = None

def get_db():
    global _db
    if _db is None and _GCP_AVAILABLE:
        try:
            _db = _firestore.Client()
        except Exception as e:
            logger.warning(f"Firestore unavailable: {e}")
    return _db


# ── Static data ───────────────────────────────────────────────────────────────
@lru_cache(maxsize=1)
def load_election_data():
    data = {}
    data_dir = os.path.join(os.path.dirname(__file__), 'data')
    resources = ['states', 'parties', 'leaders', 'results_2024',
                 'constituencies', 'election_process', 'districts']
    for name in resources:
        fpath = os.path.join(data_dir, f'{name}.json')
        try:
            with open(fpath, encoding='utf-8') as f:
                data[name] = json.load(f)
        except FileNotFoundError:
            logger.warning(f"Data file missing: {fpath}")
            data[name] = []
    return data


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/health')
@app.route('/api/health')
def health():
    return jsonify({
        'status': 'ok',
        'service': 'voteiq-india',
        'version': '2.0.0',
        'timestamp': datetime.utcnow().isoformat(),
    })


@app.route('/api/chat', methods=['POST'])
@limiter.limit("30 per minute")
def chat():
    """Gemini 1.5 Flash chat endpoint with Firestore session history."""
    body       = request.get_json(silent=True) or {}
    raw_msg    = body.get('message', '').strip()
    session_id = body.get('session_id') or str(uuid.uuid4())
    language   = body.get('language', 'en')

    # Input validation
    if not raw_msg:
        return jsonify({'error': 'Message is required'}), 400
    if len(raw_msg) > 1000:
        return jsonify({'error': 'Message too long (max 1000 chars)'}), 400

    # Sanitise — escape HTML, strip tags
    user_message = html.escape(raw_msg)
    user_message = re.sub(r'<[^>]+>', '', user_message)

    model = get_model()
    if not model:
        return jsonify({'error': 'AI service not configured. Set GEMINI_API_KEY.'}), 503

    # Load session history from Firestore
    history = []
    db = get_db()
    if db:
        try:
            doc = db.collection('sessions').document(session_id).get()
            if doc.exists:
                history = (doc.to_dict() or {}).get('history', [])[-12:]
        except Exception as e:
            logger.warning(f"Firestore read error: {e}")

    # Call Gemini
    try:
        lang_hint = " (Please respond in Hindi.)" if language == 'hi' else ""
        convo    = model.start_chat(history=history)
        response = convo.send_message(user_message + lang_hint)
        ai_reply = response.text
    except Exception as e:
        logger.error(f"Gemini error: {e}")
        return jsonify({'error': 'AI temporarily unavailable. Try again or call 1950.'}), 503

    # Persist to Firestore
    if db:
        try:
            new_history = history + [
                {'role': 'user',  'parts': [user_message]},
                {'role': 'model', 'parts': [ai_reply]},
            ]
            db.collection('sessions').document(session_id).set({
                'history':       new_history[-20:],
                'message_count': len(new_history) // 2,
                'language':      language,
                'updated_at':    datetime.utcnow(),
            }, merge=True)
            # Anonymous analytics
            db.collection('analytics').add({
                'session_id':   session_id,
                'query_length': len(user_message),
                'language':     language,
                'timestamp':    datetime.utcnow(),
            })
        except Exception as e:
            logger.warning(f"Firestore write error: {e}")

    return jsonify({'reply': ai_reply, 'session_id': session_id})


@app.route('/api/data/<resource>', methods=['GET'])
@limiter.limit("100 per minute")
def get_data(resource):
    """Serve allowlisted static election data."""
    allowed = {'states', 'parties', 'leaders', 'results_2024',
               'constituencies', 'election_process', 'districts'}
    if resource not in allowed:
        return jsonify({'error': 'Resource not found'}), 404
    data = load_election_data()
    return jsonify(data[resource])


@app.route('/api/quiz/submit', methods=['POST'])
@limiter.limit("20 per minute")
def submit_quiz():
    """Save quiz score to Firestore."""
    body       = request.get_json(silent=True) or {}
    score      = body.get('score', 0)
    total      = body.get('total', 15)
    category   = body.get('category', 'mixed')
    session_id = body.get('session_id') or str(uuid.uuid4())

    if not isinstance(score, (int, float)) or score < 0 or score > total * 10:
        return jsonify({'error': 'Invalid score'}), 400

    db = get_db()
    if db:
        try:
            db.collection('quiz_scores').add({
                'session_id': session_id,
                'score':      int(score),
                'total':      int(total),
                'category':   category,
                'timestamp':  datetime.utcnow(),
            })
        except Exception as e:
            logger.warning(f"Quiz score save error: {e}")

    return jsonify({'message': 'Score saved', 'score': score, 'total': total})


@app.route('/api/search', methods=['GET'])
@limiter.limit("60 per minute")
def search():
    """Search across states, parties, constituencies."""
    q = request.args.get('q', '').strip().lower()
    if not q or len(q) < 2:
        return jsonify({'results': []}), 200

    # Sanitise query
    q = re.sub(r'[<>"\';&]', '', q)[:100]

    data    = load_election_data()
    results = []

    for s in data.get('states', []):
        if q in s.get('name', '').lower() or q in s.get('cm', '').lower():
            results.append({'type': 'state', 'name': s['name'], 'cm': s.get('cm', '')})

    for p in data.get('parties', []):
        if q in p.get('name', '').lower() or q in p.get('leader', '').lower():
            results.append({'type': 'party', 'name': p['name'], 'seats': p.get('ls_seats', 0)})

    for l in data.get('leaders', []):
        if q in l.get('name', '').lower() or q in l.get('role', '').lower():
            results.append({'type': 'leader', 'name': l['name'], 'role': l.get('role', '')})

    for c in data.get('constituencies', []):
        if q in c.get('name', '').lower():
            results.append({'type': 'constituency', 'name': c['name'], 'state': c.get('state', '')})

    return jsonify({'results': results[:20]})


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
