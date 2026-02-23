#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PORT=8000
PYTHON_CMD=""

if command -v python3 >/dev/null 2>&1; then
  PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_CMD="python"
fi

if [ -z "$PYTHON_CMD" ]; then
  echo "Python was not found."
  echo "Install Python 3 and run this file again."
  read -r -p "Press Enter to close..."
  exit 1
fi

echo "Starting MatrixMul_Viz at http://localhost:${PORT}/"
"$PYTHON_CMD" -m webbrowser "http://localhost:${PORT}/" >/dev/null 2>&1 || true
"$PYTHON_CMD" -m http.server "${PORT}"
