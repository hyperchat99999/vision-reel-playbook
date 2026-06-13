const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || ".");
const markdown = [];
const skipDirs = new Set(["node_modules", ".git", "dist", ".vite", "frames", "out"]);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(full);
      continue;
    }
    if (entry.name.toLowerCase().endsWith(".md")) markdown.push(full);
  }
}

walk(root);

const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
const missing = [];

for (const file of markdown) {
  const body = fs.readFileSync(file, "utf8");
  let match;
  while ((match = linkPattern.exec(body))) {
    const target = match[1].trim();
    if (/^(https?:|mailto:|#)/i.test(target)) continue;
    if (target.includes("://")) continue;
    const clean = target.split("#")[0];
    if (!clean) continue;
    const resolved = path.resolve(path.dirname(file), clean);
    if (!fs.existsSync(resolved)) {
      missing.push(`${path.relative(root, file)} -> ${target}`);
    }
  }
}

if (missing.length) {
  console.error("Missing markdown targets:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Checked links in ${markdown.length} markdown file(s).`);

