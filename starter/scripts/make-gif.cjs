const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..", "..");

function requireFromStarter(name) {
  const localPath = path.resolve(rootDir, "starter", "app", "node_modules", name);
  try {
    return require(localPath);
  } catch {
    return require(name);
  }
}

function run(ffmpegPath, args) {
  const result = spawnSync(ffmpegPath, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

function main() {
  const ffmpegPath = requireFromStarter("ffmpeg-static") || "ffmpeg";
  const input = process.argv[2] || path.resolve(rootDir, "assets", "sample-clean.mp4");
  const output = process.argv[3] || path.resolve(rootDir, "assets", "sample.gif");
  const fps = process.env.GIF_FPS || "12";
  const width = process.env.GIF_WIDTH || "640";
  const palette = path.resolve(os.tmpdir(), "vision-reel-gif-palette.png");
  const scale = `fps=${fps},scale=${width}:-1:flags=lanczos`;

  if (!fs.existsSync(input)) {
    console.error(`Missing input video: ${input}`);
    console.error('Run "npm run render:sample" first, or pass paths: npm run gif -- <input.mp4> <output.gif>');
    process.exit(1);
  }

  // Two-pass palette gives a clean, small GIF (good for embedding in the README).
  run(ffmpegPath, ["-y", "-loglevel", "error", "-i", input, "-vf", `${scale},palettegen=stats_mode=diff`, palette]);
  run(ffmpegPath, ["-y", "-loglevel", "error", "-i", input, "-i", palette, "-lavfi", `${scale}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3`, output]);
  fs.rmSync(palette, { force: true });
  console.log(`wrote ${output}`);
}

main();
