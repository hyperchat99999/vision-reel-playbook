const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn, spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..", "..");
const appDir = path.resolve(rootDir, "starter", "app");
const renderScript = path.resolve(__dirname, "render.cjs");
const contactSheetScript = path.resolve(rootDir, "starter", "scripts", "contact-sheet.cjs");
const port = 5173;
const url = `http://localhost:${port}/video.html?render=1`;

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

async function waitForServer(serverProcess) {
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

function writePreviewAssets() {
  const framesDir = path.resolve(rootDir, "frames", "sample");
  const stillFrame = path.resolve(framesDir, "000112.png");
  const stillOut = path.resolve(rootDir, "assets", "sample-still.png");
  const sheetOut = path.resolve(rootDir, "assets", "sample-contact-sheet.jpg");
  const ffmpegPath = requireFromStarter("ffmpeg-static") || "ffmpeg";

  if (fs.existsSync(stillFrame)) {
    fs.copyFileSync(stillFrame, stillOut);
  }

  const sheet = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-framerate",
      "12",
      "-i",
      path.resolve(framesDir, "%06d.png"),
      "-vf",
      "select='not(mod(n,36))',scale=480:-1,tile=4x2",
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
    await waitForServer(server);
    const renderArgs = [
      renderScript,
      "--url",
      url,
      "--out",
      path.resolve(rootDir, "assets", "sample-clean.mp4"),
      "--frames-dir",
      path.resolve(rootDir, "frames", "sample"),
      "--fps",
      "12"
    ];
    const sampleAudio = ["voice.mp3", "voice.wav", "voice.m4a", "voiceover.mp3"]
      .map((f) => path.resolve(rootDir, "starter", "sample-assets", f))
      .find((p) => fs.existsSync(p));
    if (sampleAudio) renderArgs.push("--audio", sampleAudio);
    const result = spawnSync(process.execPath, renderArgs, { cwd: rootDir, stdio: "inherit" });
    if (result.status !== 0) process.exit(result.status || 1);
    writePreviewAssets();
  } catch (error) {
    if (log.trim()) console.error(log.trim());
    console.error(error.message);
    process.exit(1);
  } finally {
    stopServer(server);
  }
}

main().then(() => process.exit(0));
