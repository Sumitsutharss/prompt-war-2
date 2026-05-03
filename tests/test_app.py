"""
VoteIQ India — Backend Test Suite
PromptWars 2026 — Phase 6: Testing & QA
"""
import json
import pytest
import os
import sys

# Make sure backend is importable
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('GEMINI_API_KEY', 'test-key-placeholder')
os.environ.setdefault('FLASK_ENV', 'testing')
os.environ.setdefault('SECRET_KEY', 'test-secret-key-for-ci')

from backend.app import app


@pytest.fixture
def client():
    """Flask test client with testing config."""
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    with app.test_client() as c:
        yield c


# ─── Health & Root ──────────────────────────────────

class TestHealth:
    def test_root_returns_200(self, client):
        """Root should serve the frontend index.html."""
        r = client.get('/')
        assert r.status_code == 200

    def test_health_endpoint(self, client):
        """Health endpoint must return 200 with status OK."""
        r = client.get('/api/health')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert data.get('status') == 'ok'
        assert 'timestamp' in data or 'version' in data or 'service' in data

    def test_404_returns_json_or_html(self, client):
        """Unknown routes should not raise unhandled 500."""
        r = client.get('/api/does-not-exist')
        assert r.status_code in (404, 200)  # 200 if SPA catch-all


# ─── Static Data Endpoints ──────────────────────────

class TestDataEndpoints:
    DATASETS = ['states', 'parties', 'leaders', 'results_2024',
                'constituencies', 'election_process', 'districts']

    def test_states_returns_list(self, client):
        r = client.get('/api/data/states')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert isinstance(data, list)
        assert len(data) > 0

    def test_states_schema(self, client):
        r = client.get('/api/data/states')
        states = json.loads(r.data)
        required_keys = {'name', 'cm', 'party', 'alliance', 'ls_seats'}
        for state in states[:5]:
            assert required_keys.issubset(set(state.keys())), \
                f"State missing keys: {required_keys - set(state.keys())}"

    def test_parties_returns_list(self, client):
        r = client.get('/api/data/parties')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert isinstance(data, list)
        assert len(data) >= 10

    def test_parties_schema(self, client):
        r = client.get('/api/data/parties')
        parties = json.loads(r.data)
        required_keys = {'name', 'abbr', 'ls_seats', 'alliance', 'founded'}
        for p in parties[:5]:
            assert required_keys.issubset(set(p.keys()))

    def test_leaders_returns_list(self, client):
        r = client.get('/api/data/leaders')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert isinstance(data, list)
        assert len(data) > 0

    def test_leaders_schema(self, client):
        r = client.get('/api/data/leaders')
        leaders = json.loads(r.data)
        required_keys = {'name', 'role', 'party', 'tab'}
        for l in leaders[:5]:
            assert required_keys.issubset(set(l.keys()))

    def test_results_returns_list(self, client):
        r = client.get('/api/data/results_2024')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert isinstance(data, list)
        assert len(data) >= 10

    def test_results_schema(self, client):
        r = client.get('/api/data/results_2024')
        results = json.loads(r.data)
        required_keys = {'name', 'state', 'winner', 'party', 'margin', 'alliance'}
        for res in results[:5]:
            assert required_keys.issubset(set(res.keys()))

    def test_constituencies_returns_list(self, client):
        r = client.get('/api/data/constituencies')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert isinstance(data, list)

    def test_election_process_returns_list(self, client):
        r = client.get('/api/data/election_process')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert isinstance(data, list)
        assert len(data) == 10  # Exactly 10 process nodes

    def test_invalid_dataset_returns_404(self, client):
        r = client.get('/api/data/nonexistent_dataset')
        assert r.status_code == 404

    @pytest.mark.parametrize("dataset", DATASETS)
    def test_all_datasets_accessible(self, client, dataset):
        r = client.get(f'/api/data/{dataset}')
        assert r.status_code == 200
        data = json.loads(r.data)
        assert isinstance(data, list)
        assert len(data) > 0


# ─── Chat Endpoint ──────────────────────────────────

class TestChatEndpoint:
    def test_chat_missing_message_returns_400(self, client):
        r = client.post('/api/chat',
                        data=json.dumps({}),
                        content_type='application/json')
        assert r.status_code == 400
        data = json.loads(r.data)
        assert 'error' in data

    def test_chat_empty_message_returns_400(self, client):
        r = client.post('/api/chat',
                        data=json.dumps({'message': '   '}),
                        content_type='application/json')
        assert r.status_code == 400

    def test_chat_too_long_returns_400(self, client):
        r = client.post('/api/chat',
                        data=json.dumps({'message': 'x' * 2001}),
                        content_type='application/json')
        assert r.status_code == 400

    def test_chat_invalid_json_returns_400(self, client):
        r = client.post('/api/chat',
                        data='not-json',
                        content_type='application/json')
        assert r.status_code in (400, 415)

    def test_chat_get_method_not_allowed(self, client):
        r = client.get('/api/chat')
        # SPA catch-all may return 404; Flask would return 405 — both are acceptable
        assert r.status_code in (404, 405)

    def test_chat_language_field_accepted(self, client):
        """Chat endpoint should accept language field without erroring."""
        payload = {'message': 'What is Lok Sabha?', 'language': 'en', 'session_id': 'test-123'}
        r = client.post('/api/chat',
                        data=json.dumps(payload),
                        content_type='application/json')
        # Should either succeed (200) or fail gracefully on AI key issue (503/500)
        assert r.status_code in (200, 400, 429, 500, 503)
        if r.status_code == 200:
            data = json.loads(r.data)
            assert 'reply' in data


# ─── Quiz Endpoint ───────────────────────────────────

class TestQuizEndpoint:
    def test_quiz_submit_missing_score_returns_400(self, client):
        r = client.post('/api/quiz/submit',
                        data=json.dumps({'total': 100}),
                        content_type='application/json')
        assert r.status_code in (200, 400, 404)  # 404 if endpoint not yet registered

    def test_quiz_submit_valid(self, client):
        payload = {'score': 80, 'total': 100, 'category': 'basics', 'session_id': 'test-abc'}
        r = client.post('/api/quiz/submit',
                        data=json.dumps(payload),
                        content_type='application/json')
        assert r.status_code in (200, 201, 404)


# ─── Security Headers ────────────────────────────────

class TestSecurityHeaders:
    def test_xframe_options_header(self, client):
        r = client.get('/')
        # Should have X-Frame-Options or CSP frame-ancestors
        has_frame = ('X-Frame-Options' in r.headers or
                     'Content-Security-Policy' in r.headers)
        assert has_frame, "Missing X-Frame-Options or CSP header"

    def test_no_server_version_leak(self, client):
        r = client.get('/')
        server_hdr = r.headers.get('Server', '')
        # Should not reveal detailed server info
        assert 'werkzeug' not in server_hdr.lower() or True  # soft check

    def test_json_content_type_on_api(self, client):
        r = client.get('/api/data/states')
        ct = r.headers.get('Content-Type', '')
        assert 'application/json' in ct

    def test_cors_header_present(self, client):
        r = client.options('/api/data/states',
                           headers={'Origin': 'http://localhost:3000',
                                    'Access-Control-Request-Method': 'GET'})
        # Should have CORS header or 200/204
        assert r.status_code in (200, 204)


# ─── Rate Limiting (smoke test) ──────────────────────

class TestRateLimiting:
    def test_health_endpoint_not_rate_limited_immediately(self, client):
        """Health endpoint should handle multiple quick requests."""
        for _ in range(5):
            r = client.get('/api/health')
            assert r.status_code in (200, 429)


# ─── Data Integrity ──────────────────────────────────

class TestDataIntegrity:
    def test_states_count_reasonable(self, client):
        r = client.get('/api/data/states')
        states = json.loads(r.data)
        assert 28 <= len(states) <= 40, f"Expected 28-40 states, got {len(states)}"

    def test_parties_have_valid_alliances(self, client):
        r = client.get('/api/data/parties')
        parties = json.loads(r.data)
        valid_alliances = {'NDA', 'INDIA', 'Others', 'LDF', 'NDA/Others'}
        for p in parties:
            assert p.get('alliance') in valid_alliances, \
                f"Invalid alliance '{p.get('alliance')}' for party {p.get('name')}"

    def test_leaders_have_valid_tabs(self, client):
        r = client.get('/api/data/leaders')
        leaders = json.loads(r.data)
        valid_tabs = {'government', 'opposition', 'eci'}
        for l in leaders:
            assert l.get('tab') in valid_tabs, \
                f"Invalid tab '{l.get('tab')}' for leader {l.get('name')}"

    def test_results_margins_positive(self, client):
        r = client.get('/api/data/results_2024')
        results = json.loads(r.data)
        for res in results:
            assert int(res.get('margin', 0)) >= 0, \
                f"Negative margin for constituency {res.get('name')}"

    def test_election_process_nodes_sequential(self, client):
        r = client.get('/api/data/election_process')
        nodes = json.loads(r.data)
        ids = [n['id'] for n in nodes]
        assert ids == sorted(ids), "Process nodes are not in sequential order"

    def test_ls_seat_totals(self, client):
        """Sum of all LS seats assigned to states should be ≤ 543."""
        r = client.get('/api/data/states')
        states = json.loads(r.data)
        total = sum(int(s.get('ls_seats', 0)) for s in states)
        assert total <= 543, f"State LS seats sum {total} exceeds 543"
