# utils/jd_analyzer.py
import spacy
from collections import Counter

nlp = spacy.load("en_core_web_sm")

def extract_keywords(jd_text, top_n=20):
    doc = nlp(jd_text)
    tokens = [token.lemma_.lower() for token in doc if token.is_alpha and not token.is_stop and token.pos_ in {"NOUN", "PROPN", "VERB", "ADJ"}]
    generic_words = {"experience", "work", "team", "ability", "skill"}
    tokens = [t for t in tokens if t not in generic_words]
    keywords = [word for word, _ in Counter(tokens).most_common(top_n)]
    return keywords