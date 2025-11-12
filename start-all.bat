@echo off
title 🚀 Starting SERA (Smart Everyday Routine Assistant)
echo Initializing servers (visible mode)...
echo.

:: Detect local IP
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /i "IPv4 Address"') do (
    set "LOCAL_IP=%%A"
)
set "LOCAL_IP=%LOCAL_IP: =%"

echo 🌐 Local IP Detected: %LOCAL_IP%
echo Starting Backend and Frontend...

@echo off
:: --- BACKEND STARTUP (Hidden) ---
powershell -WindowStyle Hidden -Command ^
"Start-Process cmd.exe -ArgumentList '/c cd /d \"%~dp0\" ^& call .venv\Scripts\activate ^& python -m uvicorn app.main:app --host 0.0.0.0 --port 8000' -WindowStyle Hidden"

:: Wait for backend to initialize
timeout /t 5 >nul

:: --- FRONTEND STARTUP (Hidden) ---
powershell -WindowStyle Hidden -Command ^
"Start-Process cmd.exe -ArgumentList '/c cd /d \"%~dp0\" ^& set HOST=0.0.0.0 ^& set PORT=3000 ^& npm run dev' -WindowStyle Hidden"

start "SERA Frontend" cmd /k "cd /d .\ && set HOST=0.0.0.0 && set PORT=3000 && npm run dev"

:: Wait for frontend to start
timeout /t 8 >nul

:: Automatically open frontend (or API docs if needed)
start "" "http://%LOCAL_IP%:8080/"

echo ✅ SERA is now running!
echo.
echo Backend (PC):     http://localhost:8000
echo Backend (Phone):  http://%LOCAL_IP%:8000
echo Frontend (PC):    http://localhost:3000
echo Frontend (Phone): http://%LOCAL_IP%:3000
echo API Docs:         http://%LOCAL_IP%:8000/docs
echo.
echo Press ENTER anytime to stop all SERA servers and close their windows.

pause >nul

echo 🧹 Stopping all SERA processes...
taskkill /FI "WINDOWTITLE eq SERA Backend" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq SERA Frontend" /F >nul 2>&1
taskkill /IM "python.exe" /F >nul 2>&1
taskkill /IM "node.exe" /F >nul 2>&1

echo ✅ All SERA windows closed. Goodbye!
timeout /t 2 >nul
exit
