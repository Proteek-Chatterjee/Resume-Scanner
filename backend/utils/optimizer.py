#optimiser.py
from dotenv import load_dotenv
import google.generativeai as genai
import os
import json
import re

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def optimize_resume(resume_text, jd_text):
    prompt = f"""
    You are an expert ATS Resume Optimizer.

    Compare the following RESUME and JOB DESCRIPTION.
    Identify missing or weak points, and output suggestions in a
    **strict JSON format** with these keys:

    {{
      "missing_keywords": ["keyword1", "keyword2", "keyword3"],
      "improvement_areas": "string",
      "formatting_tips": "string",
      "skill_gaps": ["skill1", "skill2"],
      "experience_highlights": "string",
      "final_recommendations": "string"
    }}

    RESUME:
    {resume_text}

    JOB DESCRIPTION:
    {jd_text}

    Be concise but detailed.
    Do not include explanations or text outside JSON.
    """

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Extract JSON object from response safely
        json_str = re.search(r"\{.*\}", text, re.S)
        if json_str:
            parsed = json.loads(json_str.group(0))
            # Fill in missing keys with defaults to prevent UI errors
            default_structure = {
                "missing_keywords": [],
                "improvement_areas": "",
                "formatting_tips": "",
                "skill_gaps": [],
                "experience_highlights": "",
                "final_recommendations": ""
            }
            for key in default_structure:
                if key not in parsed:
                    parsed[key] = default_structure[key]
            return parsed
        else:
            return {
                "error": "⚠️ Could not parse JSON from AI response",
                "raw_output": text
            }
    except Exception as e:
        return {"error": f"⚠️ Error generating suggestions: {str(e)}"}
