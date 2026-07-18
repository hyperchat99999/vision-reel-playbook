const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    out[key.slice(2)] = argv[i + 1];
    i += 1;
  }
  return out;
}

function requireFromStarter(name) {
  const localPath = path.resolve(__dirname, "..", "app", "node_modules", name);
  try {
    return require(localPath);
  } catch {
    try {
      return require(name);
    } catch (error) {
      throw new Error(`Missing dependency "${name}". Run npm install in starter/app first.`);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const url = args.url || "http://localhost:5173/video.html?render=1";
  const fps = Number(args.fps || 30);
  const start = Number(args.start || 0);
  const width = Number(args.width || 1920);
  const height = Number(args.height || 1080);
  const outPath = path.resolve(args.out || "out/sample.mp4");
  const framesDir = path.resolve(args["frames-dir"] || "frames/sample");
  const audioPath = args.audio ? path.resolve(args.audio) : null;
  const puppeteer = requireFromStarter("puppeteer");
  const ffmpegPath = requireFromStarter("ffmpeg-static") || "ffmpeg";

  fs.mkdirSync(framesDir, { recursive: true });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  for (const entry of fs.readdirSync(framesDir)) {
    if (/^\d{6}\.png$/.test(entry)) fs.rmSync(path.join(framesDir, entry));
  }

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width, height, deviceScaleFactor: 1 },
    args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"]
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForFunction("window.__filmReady === true", { timeout: 30000 });
  const duration = Number(args.end || (await page.evaluate("window.__filmDuration")));
  const totalFrames = Math.ceil((duration - start) * fps);

  for (let frame = 0; frame <= totalFrames; frame += 1) {
    const t = start + frame / fps;
    await page.evaluate((next) => window.__filmSetT(next), t);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const file = path.join(framesDir, `${String(frame).padStart(6, "0")}.png`);
    await page.screenshot({ path: file });
    if (frame % fps === 0) console.log(`captured ${frame}/${totalFrames}`);
  }

  await browser.close();

  const ffmpegArgs = [
    "-y",
    "-framerate",
    String(fps),
    "-i",
    path.join(framesDir, "%06d.png")
  ];
  if (audioPath) ffmpegArgs.push("-i", audioPath);
  ffmpegArgs.push(
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "18",
    "-preset",
    "medium",
    "-movflags",
    "+faststart"
  );
  if (audioPath) ffmpegArgs.push("-c:a", "aac", "-b:a", "192k", "-af", "apad", "-shortest");
  ffmpegArgs.push(outPath);

  const result = spawnSync(ffmpegPath, ffmpegArgs, { stdio: "inherit" });

  if (result.status !== 0) process.exit(result.status || 1);
  console.log(`rendered ${outPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

