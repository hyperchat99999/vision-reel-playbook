const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith("--")) continue;
    options[argument.slice(2)] = argv[index + 1];
    index += 1;
  }
  return options;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "..", "..");
const appDir = path.resolve(rootDir, "starter", "app");
const options = parseArgs(process.argv.slice(2));
const required = ["clip1", "clip2", "clip3", "music", "voice1", "voice2", "voice3"];
const missing = required.filter((key) => !options[key]);

if (missing.length > 0) {
  fail(`Missing required options: ${missing.map((key) => `--${key}`).join(", ")}`);
}

const inputs = required.map((key) => path.resolve(rootDir, options[key]));
const missingFiles = inputs.filter((file) => !fs.existsSync(file));
if (missingFiles.length > 0) fail(`Missing input files:\n${missingFiles.join("\n")}`);

const beatSeconds = Number(options["beat-seconds"] || 5);
const voiceStarts = String(options["voice-starts"] || "0.45,5.55,10.25")
  .split(",")
  .map(Number);
const clipStartFrames = String(options["clip-start-frames"] || "0,0,1")
  .split(",")
  .map(Number);
if (!Number.isFinite(beatSeconds) || beatSeconds <= 0) fail("--beat-seconds must be positive.");
if (voiceStarts.length !== 3 || voiceStarts.some((value) => !Number.isFinite(value) || value < 0)) {
  fail("--voice-starts must contain three non-negative comma-separated seconds.");
}
if (clipStartFrames.length !== 3 || clipStartFrames.some((value) => !Number.isInteger(value) || value < 0)) {
  fail("--clip-start-frames must contain three non-negative comma-separated integers.");
}

const totalDuration = beatSeconds * 3;
const output = path.resolve(rootDir, options.out || "assets/vox-collage-studio.mp4");
fs.mkdirSync(path.dirname(output), { recursive: true });

let ffmpegPath;
try {
  ffmpegPath = require(path.resolve(appDir, "node_modules", "ffmpeg-static"));
} catch {
  fail("ffmpeg-static is unavailable. Run npm run setup first.");
}

const delay = (seconds) => Math.round(seconds * 1000);
const videoFilter = [0, 1, 2]
  .map((input, index) => {
    const start = clipStartFrames[index];
    const end = start + Math.round(beatSeconds * 24);
    return `[${input}:v]trim=start_frame=${start}:end_frame=${end},setpts=PTS-STARTPTS,crop=486:864:(iw-486)/2:0,scale=480:854:flags=lanczos,fps=24,format=yuv420p[v${index}]`;
  })
  .join(";");
const voiceFilter = [4, 5, 6]
  .map((input, index) => `[${input}:a]highpass=f=90,lowpass=f=15000,acompressor=threshold=0.08:ratio=3:attack=6:release=90:makeup=1.25,loudnorm=I=-16:LRA=6:TP=-1.5,adelay=${delay(voiceStarts[index])}:all=1[vo${index + 1}]`)
  .join(";");
const filter = [
  videoFilter,
  "[v0][v1][v2]concat=n=3:v=1:a=0[video]",
  `[3:a]atrim=0:${totalDuration},asetpts=PTS-STARTPTS,loudnorm=I=-20:LRA=8:TP=-3[music]`,
  voiceFilter,
  "[vo1][vo2][vo3]amix=inputs=3:duration=longest:normalize=0[voices]",
  "[voices]asplit=2[side][vox]",
  "[music][side]sidechaincompress=threshold=0.02:ratio=8:attack=10:release=180[ducked]",
  `[ducked][vox]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.89,loudnorm=I=-14:LRA=8:TP=-1,atrim=0:${totalDuration}[audio]`
].join(";");

const inputArgs = inputs.flatMap((file) => ["-i", file]);
const result = spawnSync(
  ffmpegPath,
  [
    "-y",
    ...inputArgs,
    "-filter_complex", filter,
    "-map", "[video]",
    "-map", "[audio]",
    "-t", String(totalDuration),
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "18",
    "-profile:v", "high",
    "-level", "4.0",
    "-movflags", "+faststart",
    "-c:a", "aac",
    "-b:a", "192k",
    "-ar", "48000",
    "-ac", "2",
    output
  ],
  { cwd: rootDir, stdio: "inherit" }
);

if (result.status !== 0) process.exit(result.status || 1);
console.log(`mixed VOX collage studio cut at ${output}`);
