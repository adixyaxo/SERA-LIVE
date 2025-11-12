@echo off
echo 🚀 Starting SERA Full Stack (Shareable)...

:: Get your local IP address
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /i "IPv4 Address"') do (
    set "LOCAL_IP=%%A"
)
set "LOCAL_IP=%LOCAL_IP: =%"
echo 🌐 Local IP Detected: %LOCAL_IP%

echo Starting Backend on %LOCAL_IP%:8000 ...
start "SERA Backend" cmd /k "cd /d C:\Users\adity\Desktop\SERA-main\SERA-main && .venv\Scripts\activate && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

timeout 5 >nul

echo Starting Frontend (accessible from your phone)...
start "SERA Frontend" cmd /k "cd /d C:\Users\adity\Desktop\SERA-main\SERA-main && set HOST=0.0.0.0 && set PORT=3000 && npm run dev"

echo ✅ Both servers starting...
echo Backend (PC):     http://localhost:8000
echo Backend (Phone):  http://%LOCAL_IP%:8000
echo Frontend (PC):    http://localhost:3000
echo Frontend (Phone): http://%LOCAL_IP%:3000
echo API Docs:         http://%LOCAL_IP%:8000/docs

pause
