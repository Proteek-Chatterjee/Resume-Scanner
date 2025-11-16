<<<<<<< HEAD
# utils/ats_scoring.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def ats_score(resume_text, jd_text):
    docs = [resume_text, jd_text]
    tfidf = TfidfVectorizer().fit_transform(docs)
    score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
=======
# utils/ats_scoring.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def ats_score(resume_text, jd_text):
    docs = [resume_text, jd_text]
    tfidf = TfidfVectorizer().fit_transform(docs)
    score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
>>>>>>> 0d47c57f7f5a6c16473e48e4b0355153d2628fc7
    return round(score*100, 2)