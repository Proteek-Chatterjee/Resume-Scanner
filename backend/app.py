# app.py
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.resume_parser import parse_resume
from utils.jd_analyzer import extract_keywords
from utils.ats_scoring import ats_score
from utils.optimizer import optimize_resume
from utils.alternate_profiles import get_alternate_profiles
import io

app = FastAPI(title="AI ATS Resume Optimizer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend origin later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_resume(resume_file: UploadFile, jd_text: str = Form(...)):
    try:
        content = await resume_file.read()
        b = io.BytesIO(content)
        b.name = resume_file.filename  # important so parse_resume can check extension

        resume_text = parse_resume(b)  # parse_resume expects .name on file-like
        keywords = extract_keywords(jd_text)
        score = ats_score(resume_text, jd_text)

        return {"ats_score": score, "keywords": keywords}
    except Exception as e:

        return {"error": f"server error: {e}"}

@app.post("/optimize")
async def optimize(resume_file: UploadFile, jd_text: str = Form(...)):
    content = await resume_file.read()
    b = io.BytesIO(content)
    b.name = resume_file.filename  # Ensure parse_resume works
    resume_text = parse_resume(b)
    suggestions = optimize_resume(resume_text, jd_text)
    return {"suggestions": suggestions}

@app.post("/alternates")
async def alternates(resume_file: UploadFile):
    content = await resume_file.read()
    resume_text = parse_resume(io.BytesIO(content))
    profiles = get_alternate_profiles(resume_text)
    return {"profiles": profiles}

@app.get("/")
def root():
    return {"message": "AI ATS Resume Optimizer API is running 🚀"}
