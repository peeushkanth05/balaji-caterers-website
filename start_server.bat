@echo off
echo Installing dependencies...
call npm install
echo.
echo Starting local development server...
echo The server will be available at http://localhost:3000
echo.
call npm start
pause
