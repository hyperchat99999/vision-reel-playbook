const fs = require("fs");
const path = require("path");

const csvPath = path.resolve(process.argv[2] || "templates/word-anchor-map.csv");
const body = fs.readFileSync(csvPath, "utf8").trim();
const [headerLine, ...rows] = body.split(/\r?\n/);
const headers = headerLine.split(",");
const required = ["beat_id", "local_time", "trigger_word", "visual_actor", "action"];
const missingHeaders = required.filter((key) => !headers.includes(key));

if (missingHeaders.length) {
  console.error(`Missing columns: ${missingHeaders.join(", ")}`);
  process.exit(1);
}

const errors = [];
rows.forEach((line, index) => {
  const cols = line.split(",");
  const row = Object.fromEntries(headers.map((header, i) => [header, cols[i] || ""]));
  if (!row.beat_id) errors.push(`row ${index + 2}: beat_id missing`);
  if (Number.isNaN(Number(row.local_time))) errors.push(`row ${index + 2}: local_time is not numeric`);
  if (!row.trigger_word) errors.push(`row ${index + 2}: trigger_word missing`);
  if (!row.visual_actor) errors.push(`row ${index + 2}: visual_actor missing`);
  if (!row.action) errors.push(`row ${index + 2}: action missing`);
});

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Checked ${rows.length} timing anchors.`);

