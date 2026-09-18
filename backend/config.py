import os

# MemBUD Application Configuration Settings
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'membud.db')}")
JWT_SECRET = os.getenv("AUTH_SECRET", "membud-secret-key-hackathon-2026-secure-jwt")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

GEMINI_API_KEY = os.getenv("LLM_API_KEY", os.getenv("GEMINI_API_KEY", ""))
EMBEDDING_API_KEY = os.getenv("EMBEDDING_API_KEY", GEMINI_API_KEY)

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
