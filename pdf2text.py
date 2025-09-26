import pdfplumber
import sys

pdf_path = sys.argv[1] if len(sys.argv) > 1 else ""  # path to the pdf file

with pdfplumber.open(pdf_path) as pdf:
    all_text = ""
    for page in pdf.pages:
        all_text += page.extract_text() + "\n"

print(all_text)
