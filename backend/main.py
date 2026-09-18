import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base
from backend.seed import seed_demo_data
from backend.auth.router import router as auth_router
from backend.documents.router import router as docs_router
from backend.chat.router import router as chat_router
from backend.memories.router import router as memories_router
from backend.people.router import router as people_router
from backend.events.router import router as events_router
from backend.connections.router import router as connections_router
from backend.actions.router import router as actions_router

# Initialize database tables & seed demo user
Base.metadata.create_all(bind=engine)
seed_demo_data()

app = FastAPI(
    title="MemBUD — AI Personal Memory Assistant API",
    description="Grounded RAG Personal Memory & Knowledge Base Assistant API",
    version="1.0.0"
)

# Enable CORS for local testing & hackathon deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth_router)
app.include_router(docs_router)
app.include_router(chat_router)
app.include_router(memories_router)
app.include_router(people_router)
app.include_router(events_router)
app.include_router(connections_router)
app.include_router(actions_router)

# Serve Frontend Static Assets
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app.mount("/", StaticFiles(directory=BASE_DIR, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
