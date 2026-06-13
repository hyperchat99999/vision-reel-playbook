const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const dir = path.resolve(process.argv[2] || "frames/sample");
const threshold = Number(process.argv[3] || 4.5);
const files = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((file) => file.toLowerCase().endsWith(".png")).sort()
  : [];

function readUInt32(buffer, offset) {
  return buffer.readUInt32BE(offset);
}

function parsePng(file) {
  const buffer = fs.readFileSync(file);
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buffer.length) {
    const length = readUInt32(buffer, offset);
    const type = buffer.slice(offset + 4, offset + 8).toString("ascii");
    const data = buffer.slice(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = readUInt32(data, 0);
      height = readUInt32(data, 4);
      colorType = data[9];
    }
    if (type === "IDAT") idat.push(data);
    if (type === "IEND") break;
    offset += 12 + length;
  }

  if (![2, 6].includes(colorType)) {
    throw new Error(`Only truecolor PNGs are supported: ${file}`);
  }

  const channels = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const rows = [];
  let pos = 0;
  let prev = Buffer.alloc(stride);

  for (let y = 0; y < height; y += 1) {
    const filter = raw[pos];
    pos += 1;
    const row = Buffer.from(raw.slice(pos, pos + stride));
    pos += stride;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= channels ? row[x - channels] : 0;
      const up = prev[x] || 0;
      const upLeft = x >= channels ? prev[x - channels] || 0 : 0;
      if (filter === 1) row[x] = (row[x] + left) & 255;
      else if (filter === 2) row[x] = (row[x] + up) & 255;
      else if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        const pr = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        row[x] = (row[x] + pr) & 255;
      }
    }
    rows.push(row);
    prev = row;
  }

  let count = 0;
  let sum = 0;
  let sumSq = 0;
  for (const row of rows) {
    for (let x = 0; x < row.length; x += channels) {
      const lum = 0.2126 * row[x] + 0.7152 * row[x + 1] + 0.0722 * row[x + 2];
      sum += lum;
      sumSq += lum * lum;
      count += 1;
    }
  }
  const mean = sum / count;
  const variance = Math.max(0, sumSq / count - mean * mean);
  return Math.sqrt(variance);
}

let bad = 0;
for (const file of files) {
  const full = path.join(dir, file);
  const stddev = parsePng(full);
  if (stddev < threshold) {
    bad += 1;
    console.log(`low-content ${file}: stddev=${stddev.toFixed(2)}`);
  }
}

if (bad) {
  console.error(`${bad} low-content frame(s) detected.`);
  process.exit(1);
}

console.log(`Checked ${files.length} frame(s). No low-content frames below ${threshold}.`);

