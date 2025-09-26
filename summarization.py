from transformers import pipeline
import sys

# -------------------
# 1️⃣ Input text
# -------------------
if len(sys.argv) > 1:
    # Accept input text via CLI arg (passed from orchestrator)
    text = sys.argv[1]
else:
    # Fallback to reading from stdin for large text
    text = sys.stdin.read()
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

# Also print the summary plainly so a caller can capture it
print("__SUMMARY_ONLY__\n" + summary_text)