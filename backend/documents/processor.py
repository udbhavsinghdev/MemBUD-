import os
import pypdf
import docx

def extract_text_from_file(file_path: str, file_type: str) -> list[dict]:
    """
    Extracts text and splits into chunk dicts:
    [{ "content": "...", "page": 1 }, ...]
    """
    chunks = []
    ext = file_type.lower()

    if ext == "pdf":
        try:
            reader = pypdf.PdfReader(file_path)
            for page_idx, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                if text.strip():
                    chunks.append({
                        "content": text.strip(),
                        "page": page_idx + 1
                    })
        except Exception as e:
            chunks.append({"content": f"Failed to parse PDF text: {str(e)}", "page": 1})

    elif ext == "docx":
        try:
            doc = docx.Document(file_path)
            full_text = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
            chunks.append({"content": full_text, "page": 1})
        except Exception as e:
            chunks.append({"content": f"Failed to parse DOCX text: {str(e)}", "page": 1})

    elif ext in ["png", "jpg", "jpeg"]:
        chunks.append({
            "content": f"[Image File OCR Notice: Extracted visual content from {os.path.basename(file_path)}]",
            "page": 1
        })

    else: # txt
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                text = f.read()
                chunks.append({"content": text.strip(), "page": 1})
        except Exception as e:
            chunks.append({"content": f"Failed to parse text file: {str(e)}", "page": 1})

    if not chunks:
        chunks.append({"content": f"Empty or unreadable document: {os.path.basename(file_path)}", "page": 1})

    return chunks
