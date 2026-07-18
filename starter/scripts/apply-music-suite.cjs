const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..", "..");
const suite = path.resolve(process.argv[2] || "");
const ffmpeg = require(path.resolve(root, "starter", "app", "node_modules", "ffmpeg-static")) || "ffmpeg";
const sections = [
  { id: "scroll-story", start: 0, duration: 18 },
  { id: "launch-film", start: 18, duration: 12 },
  { id: "vox-collage", start: 30, duration: 15 },
  { id: "handdraw-story", start: 45, duration: 20 }
];

if (!suite || !fs.existsSync(suite)) {
  throw new Error("Pass the generated 65-second music suite as the first argument.");
}

for (const section of sections) {
  const video = path.resolve(root, "assets", `${section.id}-demo.mp4`);
  const audio = path.resolve(root, "qc", `${section.id}-music-v2.m4a`);
  const temporary = path.resolve(root, "qc", `${section.id}-music-v2.mp4`);
  const mirror = path.resolve(root, "videos", `${section.id}-demo.mp4`);

  if (!fs.existsSync(video)) throw new Error(`Missing video master: ${video}`);

  const slice = spawnSync(ffmpeg, [
    "-y", "-ss", String(section.start), "-t", String(section.duration), "-i", suite,
    "-vn", "-c:a", "aac", "-b:a", "224k", "-af", "loudnorm=I=-14:TP=-1.2:LRA=8", audio
  ], { stdio: "inherit" });
  if (slice.status !== 0) process.exit(slice.status || 1);

  const mux = spawnSync(ffmpeg, [
    "-y", "-i", video, "-i", audio, "-map", "0:v:0", "-map", "1:a:0",
    "-c:v", "copy", "-c:a", "copy", "-t", String(section.duration), "-movflags", "+faststart", temporary
  ], { stdio: "inherit" });
  if (mux.status !== 0) process.exit(mux.status || 1);

  fs.copyFileSync(temporary, video);
  fs.copyFileSync(temporary, mirror);
  console.log(`applied Music v2 section to ${section.id}`);
}
