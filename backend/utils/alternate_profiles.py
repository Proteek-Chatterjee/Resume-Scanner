<<<<<<< HEAD
# utils/alternate_profiles.py
from dotenv import load_dotenv
import google.generativeai as genai
import os
import json
import re

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def get_alternate_profiles(resume_text):
    """
    Suggests 5 alternate job profiles (with higher match % for relevant roles).
    """
    prompt = f"""
    You are an expert career matching assistant.
    Analyze the following RESUME and suggest 5 ALTERNATE job roles 
    that the candidate could also qualify for (apart from their main role).

    Assign a "match" percentage (0–100) that indicates how closely 
    the candidate's skills, experience, and background align with that role.

    Important rules for match %:
    - Roles that are directly relevant or skill-similar → 85–100%
    - Roles somewhat related → 70–84%
    - Distant but possible transitions → 60–69%
    - Never give values below 60.
    - Try to maximize match % whenever possible based on the resume content.

    OUTPUT STRICTLY as a JSON array (no text, no markdown):
    [
      {{"job_title": "Data Analyst", "match": 95}},
      {{"job_title": "Business Intelligence Specialist", "match": 92}},
      {{"job_title": "Data Engineer", "match": 89}},
      {{"job_title": "Machine Learning Engineer", "match": 88}},
      {{"job_title": "Operations Analyst", "match": 86}}
    ]

    Resume:
    {resume_text}
    """

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Extract JSON safely
        json_match = re.search(r"\[.*\]", text, re.S)
        if not json_match:
            json_match = re.search(r"```json(.*?)```", text, re.S)

        if json_match:
            json_text = json_match.group(0)
            json_text = json_text.replace("```json", "").replace("```", "").strip()
            profiles = json.loads(json_text)
            if isinstance(profiles, list):
                # Clip match values to 100 max
                for p in profiles:
                    if "match" in p and p["match"] > 100:
                        p["match"] = 100
                return profiles

        return [{"job_title": "⚠️ Parsing Error", "match": 0, "raw_output": text}]

    except Exception as e:
        return [{"job_title": f"⚠️ Error: {e}", "match": 0}]
=======
# utils/alternate_profiles.py
from dotenv import load_dotenv
import google.generativeai as genai
import os
import json
import re

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def get_alternate_profiles(resume_text):
    """
    Suggests 5 alternate job profiles (with higher match % for relevant roles).
    """
    prompt = f"""
    You are an expert career matching assistant.
    Analyze the following RESUME and suggest 5 ALTERNATE job roles 
    that the candidate could also qualify for (apart from their main role).

    Assign a "match" percentage (0–100) that indicates how closely 
    the candidate's skills, experience, and background align with that role.

    Important rules for match %:
    - Roles that are directly relevant or skill-similar → 85–100%
    - Roles somewhat related → 70–84%
    - Distant but possible transitions → 60–69%
    - Never give values below 60.
    - Try to maximize match % whenever possible based on the resume content.

    OUTPUT STRICTLY as a JSON array (no text, no markdown):
    [
      {{"job_title": "Data Analyst", "match": 95}},
      {{"job_title": "Business Intelligence Specialist", "match": 92}},
      {{"job_title": "Data Engineer", "match": 89}},
      {{"job_title": "Machine Learning Engineer", "match": 88}},
      {{"job_title": "Operations Analyst", "match": 86}}
    ]

    Resume:
    {resume_text}
    """

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Extract JSON safely
        json_match = re.search(r"\[.*\]", text, re.S)
        if not json_match:
            json_match = re.search(r"```json(.*?)```", text, re.S)

        if json_match:
            json_text = json_match.group(0)
            json_text = json_text.replace("```json", "").replace("```", "").strip()
            profiles = json.loads(json_text)
            if isinstance(profiles, list):
                # Clip match values to 100 max
                for p in profiles:
                    if "match" in p and p["match"] > 100:
                        p["match"] = 100
                return profiles

        return [{"job_title": "⚠️ Parsing Error", "match": 0, "raw_output": text}]

    except Exception as e:
        return [{"job_title": f"⚠️ Error: {e}", "match": 0}]
>>>>>>> 0d47c57f7f5a6c16473e48e4b0355153d2628fc7
