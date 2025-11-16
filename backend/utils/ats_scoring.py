# utils/ats_scoring.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def ats_score(resume_text, jd_text):
    docs = [resume_text, jd_text]
    tfidf = TfidfVectorizer().fit_transform(docs)
    score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
    return round(score*100, 2)