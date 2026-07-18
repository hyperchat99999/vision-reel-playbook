const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const cli = path.resolve(__dirname, "..", "bin", "create-vision-reel.cjs");

function runCli(args, cwd) {
  return spawnSync(process.execPath, [cli, ...args], { cwd, encoding: "utf8" });
}

function runNpm(args, cwd) {
  if (process.platform === "win32") {
    return spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", `npm.cmd ${args.join(" ")}`], {
      cwd,
      encoding: "utf8"
    });
  }
  return spawnSync("npm", args, { cwd, encoding: "utf8" });
}

test("creates a self-contained project without installing dependencies", (t) => {
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "create-vision-reel-"));
  t.after(() => fs.rmSync(sandbox, { recursive: true, force: true }));

  const result = runCli(["sample-film", "--no-install"], sandbox);
  assert.equal(result.status, 0, result.stderr);

  const project = path.join(sandbox, "sample-film");
  const generatedPackage = JSON.parse(fs.readFileSync(path.join(project, "package.json"), "utf8"));
  assert.equal(generatedPackage.name, "sample-film");
  assert.equal(generatedPackage.private, true);
  assert.equal(fs.existsSync(path.join(project, "starter", "app", "src", "video", "VideoApp.jsx")), true);
  assert.equal(fs.existsSync(path.join(project, "starter", "render", "render-sample.cjs")), true);
  assert.equal(fs.existsSync(path.join(project, "starter", "scripts", "mix-vox-collage-studio.cjs")), true);
  assert.equal(fs.existsSync(path.join(project, "templates", "creative-brief.md")), true);
  assert.equal(fs.existsSync(path.join(project, "starter", "app", "node_modules")), false);
  assert.deepEqual(
    JSON.parse(fs.readFileSync(path.join(project, "starter", "app", "src", "video", "default-preset.json"), "utf8")),
    { preset: "classic" }
  );

  const check = runNpm(["run", "check"], project);
  assert.equal(check.status, 0, `${check.stdout}\n${check.stderr}`);
});

test("creates projects with each visual preset", (t) => {
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "create-vision-reel-presets-"));
  t.after(() => fs.rmSync(sandbox, { recursive: true, force: true }));

  for (const preset of ["scroll-story", "launch-film", "vox-collage"]) {
    const result = runCli([preset, "--type", preset, "--no-install"], sandbox);
    assert.equal(result.status, 0, result.stderr);
    const config = JSON.parse(
      fs.readFileSync(path.join(sandbox, preset, "starter", "app", "src", "video", "default-preset.json"), "utf8")
    );
    assert.deepEqual(config, { preset });
    if (preset === "vox-collage") {
      assert.equal(fs.existsSync(path.join(sandbox, preset, "starter", "app", "src", "video", "VoxCollageFilm.jsx")), true);
      assert.equal(fs.existsSync(path.join(sandbox, preset, "starter", "app", "src", "video", "vox-collage-config.json")), true);
    }
  }
});

test("rejects an unknown visual preset", () => {
  const result = runCli(["sample-film", "--type", "unknown", "--no-install"], process.cwd());
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown preset/);
});

test("refuses to write into a non-empty destination", (t) => {
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "create-vision-reel-"));
  t.after(() => fs.rmSync(sandbox, { recursive: true, force: true }));
  const destination = path.join(sandbox, "existing");
  fs.mkdirSync(destination);
  fs.writeFileSync(path.join(destination, "keep.txt"), "keep me", "utf8");

  const result = runCli(["existing", "--no-install"], sandbox);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Destination is not empty/);
  assert.equal(fs.readFileSync(path.join(destination, "keep.txt"), "utf8"), "keep me");
});

test("prints help without creating files", () => {
  const result = runCli(["--help"], process.cwd());
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /create-vision-reel <directory>/);
});
