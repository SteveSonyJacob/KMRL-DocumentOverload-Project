import pdfplumber

pdf_path = r"" #path to the pdf file

with pdfplumber.open(pdf_path) as pdf:
    all_text = ""
    for page in pdf.pages:
        all_text += page.extract_text() + "\n"

print(all_text)
