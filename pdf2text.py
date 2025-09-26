import pdfplumber
import sys
import os

pdf_path = sys.argv[1] if len(sys.argv) > 1 else ""  # path to the pdf file

with pdfplumber.open(pdf_path) as pdf:
    all_text = ""
    for page in pdf.pages:
        content = page.extract_text() or ""
        all_text += content + "\n"

# Always print to stdout for compatibility
print(all_text)

# If an input path was provided, also write a sibling .txt file next to the PDF
if pdf_path:
    base = os.path.splitext(os.path.basename(pdf_path))[0]
    out_dir = os.path.dirname(pdf_path)
    out_path = os.path.join(out_dir, f"{base}.txt")
    try:
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(all_text)
        # Optional: write the path to stderr so callers can see where it went
        # but avoid polluting stdout which contains only the text
        sys.stderr.write(f"Saved extracted text to: {out_path}\n")
    except Exception as e:
        sys.stderr.write(f"Failed to write text file: {e}\n")
