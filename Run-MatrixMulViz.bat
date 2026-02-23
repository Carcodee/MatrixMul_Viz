@echo off
setlocal

cd /d "%~dp0"
set "PORT=8000"
set "PYTHON_CMD="

where py >nul 2>nul
if %errorlevel%==0 (
  set "PYTHON_CMD=py -3"
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    set "PYTHON_CMD=python"
  ) else (
    where python3 >nul 2>nul
    if %errorlevel%==0 (
      set "PYTHON_CMD=python3"
    )
  )
)

if "%PYTHON_CMD%"=="" (
  echo Python was not found.
  echo Install Python 3 and run this file again.
  pause
  exit /b 1
)

echo Starting MatrixMul_Viz at http://localhost:%PORT%/
start "" "http://localhost:%PORT%/"

%PYTHON_CMD% -m http.server %PORT%

endlocal
