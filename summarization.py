import sys
import os
from google import genai
try:
    # Load variables from a local .env if present
    from dotenv import load_dotenv  # type: ignore
    load_dotenv()
except Exception:
    # dotenv is optional; proceed if not installed
    pass

# -------------------
# 1️⃣ Input text
# -------------------
if len(sys.argv) > 1:
    # Accept input text via CLI arg (passed from orchestrator)
    text = sys.argv[1]
else:
    # Fallback to reading from stdin for large text
    text = sys.stdin.read()

# Guard: ensure we actually received input
if not text or not text.strip():
    sys.stderr.write("summarization.py: No input text received. Pipe PDF text or pass as an argument.\n")
    # Print marker with empty summary so callers don't hang
    print("Summary:\n")
    print("__SUMMARY_ONLY__\n")
    sys.exit(1)

# -------------------
# 2️⃣ Summarization via Gemini
# -------------------
# Prefer explicit API key if provided via environment (e.g., GOOGLE_API_KEY)
api_key = os.environ.get("GOOGLE_API_KEY")
if not api_key or not api_key.strip():
    sys.stderr.write(
        "summarization.py: Missing GOOGLE_API_KEY. Set it in environment or .env.\n"
    )
    # Print marker with empty summary so callers don't hang
    print("Summary:\n")
    print("__SUMMARY_ONLY__\n")
    sys.exit(1)
client = genai.Client(api_key=api_key)

MAX_INPUT_CHARS = 20000  # keep prompt within model limits
input_text = text[:MAX_INPUT_CHARS]
prompt = f"Summarize the following in short: {input_text}"

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    summary_text = (response.text or "").strip()
except Exception as e:
    sys.stderr.write(f"summarization.py: Gemini call failed: {e}\n")
    summary_text = ""

print("Summary:")
print(summary_text)

# -------------------
# 3️⃣ Save summary for tagging
# -------------------
with open("summary.txt", "w", encoding="utf-8") as f:
    f.write(summary_text)

# Also print the summary plainly so a caller can capture it
print("__SUMMARY_ONLY__\n" + summary_text)