"""
MemBUD Server Launcher Script
Run this script to launch the full FastAPI Backend + Frontend:
    python server.py
"""

import os
import sys
import webbrowser

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

print("==================================================")
print("🧠 MemBUD — AI Personal Memory Assistant Server")
print("Starting FastAPI Backend + Embedded Frontend...")
print(f"Server URL: http://localhost:{PORT}")
print("==================================================")

try:
    import uvicorn
    webbrowser.open(f"http://localhost:{PORT}")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=PORT, reload=True)
except Exception as e:
    print(f"Starting standard HTTP server fallback... ({e})")
    import http.server
    import socketserver
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        webbrowser.open(f"http://localhost:{PORT}")
        httpd.serve_forever()
