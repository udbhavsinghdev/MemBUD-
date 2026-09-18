import json
import math
from typing import List, Dict, Any
from google import genai
from backend.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

def get_text_embedding(text: str) -> List[float]:
    """Generates embedding vector via Gemini SDK or fallback deterministic float vector."""
    if client and GEMINI_API_KEY:
        try:
            res = client.models.embed_content(
                model='gemini-embedding-001',
                contents=text
            )
            if hasattr(res, 'embedding') and hasattr(res.embedding, 'values'):
                return res.embedding.values
            elif hasattr(res, 'embeddings') and len(res.embeddings) > 0:
                return res.embeddings[0].values
        except Exception:
            pass

    # Fallback pseudo-embedding generator (128-dim) for offline/local hackathon mode
    vec = [0.0] * 128
    for i, char in enumerate(text.lower()):
        vec[ord(char) % 128] += (i + 1) * 0.01
    norm = math.sqrt(sum(x * x for x in vec)) or 1.0
    return [x / norm for x in vec]

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    if not v1 or not v2 or len(v1) != len(v2):
        return 0.0
    dot = sum(a * b for a, b in zip(v1, v2))
    norm1 = math.sqrt(sum(a * a for a in v1)) or 1.0
    norm2 = math.sqrt(sum(b * b for b in v2)) or 1.0
    return dot / (norm1 * norm2)
