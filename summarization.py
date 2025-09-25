text = "demo"
from transformers import pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
