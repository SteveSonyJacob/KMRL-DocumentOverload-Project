import json
import sys

if len(sys.argv) > 1:
    summary_text = sys.argv[1]
else:
    with open("summary.txt", "r", encoding="utf-8") as f:
        summary_text = f.read()
# -------------------
# 2️⃣ Define keywords for tagging
# -------------------
tag_keywords = {
    "Safety": ["safety", "hazard", "incident", "inspection", "accident"],
    "Finance": ["budget", "invoice", "cost", "expense", "revenue"],
    "Maintenance": ["repair", "maintenance", "equipment", "service", "inspection"],
    "HR": ["employee", "hiring", "training", "leave", "salary"],
}
def get_tags(text):
    text = text.lower()
    tags = []
    for category, keywords in tag_keywords.items():
        if any(word in text for word in keywords):
            tags.append(category)
    return tags
# -------------------
# 3️⃣ Generate tags
# -------------------
tags = get_tags(summary_text)
print("Tags:", tags)
# -------------------
# 4️⃣ Save summary + tags to docs.json
# -------------------
filename = sys.argv[2] if len(sys.argv) > 2 else "uploaded.pdf"
doc_data = {
    "filename": filename,
    "summary": summary_text,
    "tags": tags
}
with open("docs.json", "a", encoding="utf-8") as f:
    f.write(json.dumps(doc_data) + "\n")
    