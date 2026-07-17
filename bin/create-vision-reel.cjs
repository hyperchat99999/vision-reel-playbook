#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const packageRoot = path.resolve(__dirname, "..");
const packageJson = require(path.join(packageRoot, "package.json"));
const ignoredDirectoryNames = new Set(["node_modules", "dist", ".vite"]);
const copyEntries = [
  ["starter/app", "starter/app"],
  ["starter/render", "starter/render"],
  ["starter/scripts", "starter/scripts"],
  ["starter/sample-data", "starter/sample-data"],
  ["templates", "templates"],
  ["cli-template/README.md", "README.md"],
  ["cli-template/AGENTS.md", "AGENTS.md"],
  ["cli-template/gitignore", ".gitignore"],
  ["LICENSE", "LICENSE"]
];

function printHelp() {
  console.log(`Create a standalone Vision Reel project.

Usage:
  create-vision-reel <directory> [--no-install]

Options:
  --no-install  Create the project without installing dependencies
  --help        Show this help
  --version     Show the package version`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exitCode = 1;
}

function parseArguments(argv) {
  const positionals = [];
  let install = true;

  for (const argument of argv) {
    if (argument === "--no-install") {
      install = false;
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option "${argument}".`);
    } else {
      positionals.push(argument);
    }
  }

  if (positionals.length !== 1) {
    throw new Error("Provide exactly one destination directory.");
  }

  return { destination: positionals[0], install };
}

function projectNameFromDirectory(directory) {
  const normalized = path.basename(directory)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^[._-]+|[._-]+$/g, "");
  return normalized || "my-vision-reel";
}

function shouldCopy(source) {
  const relative = path.relative(packageRoot, source);
  return !relative.split(path.sep).some((part) => ignoredDirectoryNames.has(part));
}

function copyProject(stageDirectory, projectName) {
  for (const [sourceRelative, destinationRelative] of copyEntries) {
    const source = path.join(packageRoot, sourceRelative);
    const destination = path.join(stageDirectory, destinationRelative);
    if (!fs.existsSync(source)) {
      throw new Error(`The package is missing required template content: ${sourceRelative}`);
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(source, destination, { recursive: true, filter: shouldCopy });
  }

  const templatePackage = JSON.parse(
    fs.readFileSync(path.join(packageRoot, "cli-template", "package.json"), "utf8")
  );
  templatePackage.name = projectName;
  fs.writeFileSync(
    path.join(stageDirectory, "package.json"),
    `${JSON.stringify(templatePackage, null, 2)}\n`,
    "utf8"
  );
}

function createProject(destinationArgument) {
  const destination = path.resolve(process.cwd(), destinationArgument);
  const parent = path.dirname(destination);
  const destinationExists = fs.existsSync(destination);

  if (destinationExists && !fs.statSync(destination).isDirectory()) {
    throw new Error(`Destination is not a directory: ${destination}`);
  }
  if (destinationExists && fs.readdirSync(destination).length > 0) {
    throw new Error(`Destination is not empty: ${destination}`);
  }

  fs.mkdirSync(parent, { recursive: true });
  const stage = fs.mkdtempSync(path.join(parent, `.${path.basename(destination)}-`));

  try {
    copyProject(stage, projectNameFromDirectory(destination));
    if (destinationExists) fs.rmdirSync(destination);
    fs.renameSync(stage, destination);
  } catch (error) {
    fs.rmSync(stage, { recursive: true, force: true });
    throw error;
  }

  return destination;
}

function installDependencies(destination) {
  const command = process.platform === "win32" ? (process.env.ComSpec || "cmd.exe") : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", "npm.cmd run setup"]
    : ["run", "setup"];
  const result = spawnSync(command, args, { cwd: destination, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error("Dependency installation failed. The project was created; run npm run setup inside it to retry.");
  }
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help")) {
    printHelp();
    return;
  }
  if (argv.includes("--version")) {
    console.log(packageJson.version);
    return;
  }

  try {
    const options = parseArguments(argv);
    const destination = createProject(options.destination);
    console.log(`Created Vision Reel project at ${destination}`);
    if (options.install) installDependencies(destination);
    console.log("Next: cd into the project and run npm run render:sample");
  } catch (error) {
    fail(error.message);
  }
}

main();
