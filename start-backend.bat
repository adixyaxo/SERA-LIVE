@echo off
echo Starting SERA Backend...
cd /d ".\"
call .venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause