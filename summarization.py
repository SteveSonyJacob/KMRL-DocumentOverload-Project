from transformers import pipeline

# -------------------
# 1️⃣ Input text
# -------------------
text = """

Safety inspections revealed three minor hazards in the central station.
The board recommended immediate corrective measures and an additional audit next month.
"""
# -------------------
# 2️⃣ Summarization
# -------------------
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
summary_result = summarizer(text, max_length=150, min_length=40, do_sample=False)
summary_text = summary_result[0]["summary_text"]
print("Summary:")
print(summary_text)
# -------------------
# 3️⃣ Save summary for tagging
# -------------------
with open("summary.txt", "w", encoding="utf-8") as f:
    f.write(summary_text)