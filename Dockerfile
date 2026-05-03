# ── VoteIQ India — Bharat Gaurav ──────────────────
# Production Dockerfile for Google Cloud Run
# PromptWars 2026 — Sumit Suthar

FROM python:3.11-slim

# Security: non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Working directory
WORKDIR /app

# Install dependencies (as root, then drop privileges)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Ownership to non-root user
RUN chown -R appuser:appuser /app

# Drop to non-root
USER appuser

# Cloud Run port
EXPOSE 8080

ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Start with gunicorn (production WSGI server)
CMD exec gunicorn \
    --bind 0.0.0.0:${PORT} \
    --workers 2 \
    --threads 4 \
    --timeout 30 \
    --access-logfile - \
    --error-logfile - \
    backend.app:app
