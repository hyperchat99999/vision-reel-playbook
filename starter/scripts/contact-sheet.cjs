const fs = require("fs");
const path = require("path");

const inputDir = path.resolve(process.argv[2] || "frames/sample");
const output = path.resolve(process.argv[3] || "qc/contact-sheet.html");
const displayInput = path.relative(process.cwd(), inputDir).replace(/\\/g, "/") || ".";
const files = fs.existsSync(inputDir)
  ? fs.readdirSync(inputDir).filter((file) => file.toLowerCase().endsWith(".png")).sort()
  : [];

fs.mkdirSync(path.dirname(output), { recursive: true });

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Contact Sheet</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 24px; background: #f5f8fc; color: #0b1f33; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 14px; }
    figure { margin: 0; background: white; border: 1px solid #d9e2f2; border-radius: 8px; padding: 10px; }
    img { width: 100%; display: block; }
    figcaption { font-size: 12px; color: #5b708a; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>Contact Sheet</h1>
  <p>${files.length} frame(s) from ${displayInput}</p>
  <div class="grid">
    ${files.map((file) => {
      const src = path.relative(path.dirname(output), path.join(inputDir, file)).replace(/\\/g, "/");
      return `<figure><img src="${src}" alt="${file}" /><figcaption>${file}</figcaption></figure>`;
    }).join("\n")}
  </div>
</body>
</html>`;

fs.writeFileSync(output, html);
console.log(`wrote ${output}`);
