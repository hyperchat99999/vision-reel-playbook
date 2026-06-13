const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || ".");
const deny = [
  /api[_-]?key\s*[:=]/i,
  /secret\s*[:=]/i,
  /token\s*[:=]/i,
  /sk-[A-Za-z0-9_-]{20,}/,
  /[A-Z]:\\Users\\/,
  /client[-_\s]?name[-_\s]?here/i,
  /internal[-_\s]?codename[-_\s]?here/i
];
const skipDirs = new Set(["node_modules", ".git", "dist", ".vite", "frames", "out", "qc", "rendered"]);
const textExt = new Set([".md", ".txt", ".csv", ".json", ".js", ".jsx", ".ts", ".tsx", ".html", ".css", ".cjs"]);
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(path.join(dir, entry.name));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!textExt.has(ext)) continue;
    const file = path.join(dir, entry.name);
    const body = fs.readFileSync(file, "utf8");
    for (const pattern of deny) {
      if (pattern.test(body)) findings.push({ file, pattern: String(pattern) });
    }
  }
}

walk(root);

if (findings.length) {
  console.error("Potential IP or secret findings:");
  for (const finding of findings) {
    console.error(`- ${path.relative(root, finding.file)} matched ${finding.pattern}`);
  }
  process.exit(1);
}

console.log("No generic IP or secret findings.");
