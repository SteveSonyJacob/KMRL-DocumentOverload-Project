import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

function runPython(scriptPath, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const python = process.env.PYTHON || "python";
    const proc = spawn(python, [scriptPath, ...args], options);
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (data) => (stdout += data.toString()));
    proc.stderr.on("data", (data) => (stderr += data.toString()));
    proc.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(stderr || `Python exited with code ${code}`));
    });
  });
}

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filepath = req.file.path;
    const filename = req.file.originalname;
    const ext = path.extname(filename).toLowerCase();

  // 1) PDF to text (only for PDFs)
  let extractedText = "";
  if (ext === ".pdf") {
    try {
      const { stdout } = await runPython(path.join(__dirname, "..", "pdf2text.py"), [filepath]);
      extractedText = stdout.trim();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`pdf2text failed for ${filename}: ${e?.message || e}`);
      extractedText = "";
    }
  } else {
    extractedText = "";
  }

  // Persist extracted text next to the uploaded file (always write, even if empty)
  const baseName = path.basename(filename, ext);
  const textFilePath = path.join(uploadsDir, `${baseName}.txt`);
  try {
    fs.writeFileSync(textFilePath, extractedText || "", "utf8");
    // eslint-disable-next-line no-console
    console.log(`Saved extracted text to: ${textFilePath}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Failed to write text file: ${e?.message || e}`);
  }

    // 2) Summarization (pass text via stdin to avoid arg limits)
    const python = process.env.PYTHON || "python";
    const sumProc = spawn(python, [path.join(__dirname, "..", "summarization.py")]);
    let sumOut = "";
    let sumErr = "";
    sumProc.stdout.on("data", (d) => (sumOut += d.toString()));
    sumProc.stderr.on("data", (d) => (sumErr += d.toString()));
    sumProc.on("close", async (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: sumErr || "Summarization failed" });
      }
      const marker = "__SUMMARY_ONLY__\n";
      const idx = sumOut.lastIndexOf(marker);
      const summary = idx >= 0 ? sumOut.substring(idx + marker.length).trim() : sumOut.trim();

      // 3) Tagging (also writes to docs.json)
      const { stdout: tagOut } = await runPython(path.join(__dirname, "..", "tagging.py"), [summary, filename]);
      // Try to parse tags from "Tags: [...]" line
      let tags = [];
      const match = tagOut.match(/Tags:\s*(\[.*\])/);
      if (match) {
        try { tags = JSON.parse(match[1].replace(/'/g, '"')); } catch {}
      }

      return res.json({ filename, text: extractedText, summary, tags, textFilePath });
    });
    sumProc.stdin.write(extractedText);
    sumProc.stdin.end();
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Upload server listening on http://localhost:${port}`);
});


