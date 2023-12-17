from fastapi import FastAPI, HTTPException
from googleAI import generate_branding_snippet, generate_keywords, get_max_input_length

app = FastAPI()


@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input(prompt)

    snippet = generate_branding_snippet(prompt)
    return {"prompt": f"{prompt}", "snippet": snippet}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input(prompt)

    keywords = generate_keywords(prompt)
    return {"prompt": f"{prompt}", "keywords": keywords}


def validate_input(prompt: str):
    if len(prompt) > get_max_input_length():
        raise HTTPException(
            status_code=400, detail=f"Input too long. Max input length: {get_max_input_length()} characters.")

# uvicorn main:app --reload
