const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn, spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..", "..");
const appDir = path.resolve(rootDir, "starter", "app");
const renderScript = path.resolve(__dirname, "render.cjs");
const contactSheetScript = path.resolve(rootDir, "starter", "scripts", "contact-sheet.cjs");
const demoAudioScript = path.resolve(rootDir, "starter", "scripts", "make-demo-audio.cjs");
const presetManifest = require(path.resolve(appDir, "src", "video", "preset-manifest.json"));
const defaultPresetConfig = require(path.resolve(appDir, "src", "video", "default-preset.json"));
const port = 5173;

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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function request(urlToCheck) {
  return new Promise((resolve) => {
    const req = http.get(urlToCheck, (res) => {
      res.resume();
      resolve(res.statusCode >= 200 && res.statusCode < 500);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(serverProcess, url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (serverProcess.exitCode !== null) break;
    if (await request(url)) return;
    await wait(500);
  }
  throw new Error(`Starter app did not become ready at ${url}`);
}

function stopServer(serverProcess) {
  if (!serverProcess || serverProcess.exitCode !== null) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(serverProcess.pid), "/T", "/F"], { stdio: "ignore" });
    if (serverProcess.stdout) serverProcess.stdout.destroy();
    if (serverProcess.stderr) serverProcess.stderr.destroy();
    return;
  }
  serverProcess.kill("SIGTERM");
  if (serverProcess.stdout) serverProcess.stdout.destroy();
  if (serverProcess.stderr) serverProcess.stderr.destroy();
}

function requireFromStarter(name) {
  const localPath = path.resolve(appDir, "node_modules", name);
  try {
    return require(localPath);
  } catch {
    return require(name);
  }
}

function writePreviewAssets({ assetStem, framesDir, fps }) {
  const frameFiles = fs.readdirSync(framesDir).filter((file) => /^\d{6}\.png$/.test(file)).sort();
  if (frameFiles.length === 0) throw new Error(`No frames were captured in ${framesDir}`);
  const stillFrame = path.resolve(framesDir, frameFiles[Math.floor(frameFiles.length * 0.56)]);
  const stillOut = path.resolve(rootDir, "assets", `${assetStem}-still.png`);
  const sheetOut = path.resolve(rootDir, "assets", `${assetStem}-contact-sheet.jpg`);
  const ffmpegPath = requireFromStarter("ffmpeg-static") || "ffmpeg";
  const interval = Math.max(1, Math.floor(frameFiles.length / 8));

  if (fs.existsSync(stillFrame)) {
    fs.copyFileSync(stillFrame, stillOut);
  }

  const sheet = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      path.resolve(framesDir, "%06d.png"),
      "-vf",
      `select='not(mod(n,${interval}))',scale=360:-1,tile=4x2:padding=8:margin=8:color=0x0a0f1a`,
      "-frames:v",
      "1",
      "-update",
      "1",
      sheetOut
    ],
    { cwd: rootDir, stdio: "inherit" }
  );
  if (sheet.status !== 0) process.exit(sheet.status || 1);

  const htmlSheet = spawnSync(
    process.execPath,
    [contactSheetScript, framesDir, path.resolve(rootDir, "qc", "contact-sheet.html")],
    { cwd: rootDir, stdio: "inherit" }
  );
  if (htmlSheet.status !== 0) process.exit(htmlSheet.status || 1);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const presetId = options.preset || defaultPresetConfig.preset;
  const preset = presetManifest[presetId];
  if (!preset) throw new Error(`Unknown preset "${presetId}". Choose: ${Object.keys(presetManifest).join(", ")}`);
  const fps = Number(options.fps || (presetId === "classic" ? 12 : 24));
  const width = Number(options.width || preset.width);
  const height = Number(options.height || preset.height);
  const assetStem = presetId === "classic" ? "sample" : `${presetId}-demo`;
  const framesDir = path.resolve(rootDir, "frames", presetId === "classic" ? "sample" : presetId);
  const url = `http://localhost:${port}/video.html?render=1&preset=${encodeURIComponent(presetId)}`;
  const command = process.platform === "win32" ? "cmd.exe" : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/c", "npm.cmd run dev -- --port 5173 --strictPort"]
    : ["run", "dev", "--", "--port", String(port), "--strictPort"];
  const server = spawn(
    command,
    args,
    {
      cwd: appDir,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    }
  );

  let log = "";
  server.stdout.on("data", (chunk) => {
    log += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    log += chunk.toString();
  });

  try {
    await waitForServer(server, url);
    const renderArgs = [
      renderScript,
      "--url",
      url,
      "--out",
      path.resolve(rootDir, "assets", `${assetStem}.mp4`),
      "--frames-dir",
      framesDir,
      "--fps",
      String(fps),
      "--width",
      String(width),
      "--height",
      String(height)
    ];
    let sampleAudio = options.audio ? path.resolve(options.audio) : null;
    if (!sampleAudio && presetId === "classic") {
      sampleAudio = ["voice.mp3", "voice.wav", "voice.m4a", "voiceover.mp3"]
        .map((f) => path.resolve(rootDir, "starter", "sample-assets", f))
        .find((p) => fs.existsSync(p));
    }
    if (!sampleAudio && presetId !== "classic") {
      sampleAudio = path.resolve(rootDir, "qc", `${presetId}-score.wav`);
      const audioResult = spawnSync(
        process.execPath,
        [demoAudioScript, "--preset", presetId, "--out", sampleAudio],
        { cwd: rootDir, stdio: "inherit" }
      );
      if (audioResult.status !== 0) process.exit(audioResult.status || 1);
    }
    if (sampleAudio) renderArgs.push("--audio", sampleAudio);
    const result = spawnSync(process.execPath, renderArgs, { cwd: rootDir, stdio: "inherit" });
    if (result.status !== 0) process.exit(result.status || 1);
    writePreviewAssets({ assetStem, framesDir, fps });
  } catch (error) {
    if (log.trim()) console.error(log.trim());
    console.error(error.message);
    process.exit(1);
  } finally {
    stopServer(server);
  }
}

main().then(() => process.exit(0));
