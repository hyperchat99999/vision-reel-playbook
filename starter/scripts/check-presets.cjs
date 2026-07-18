const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const videoDir = path.resolve(root, "starter", "app", "src", "video");
const manifest = JSON.parse(fs.readFileSync(path.join(videoDir, "preset-manifest.json"), "utf8"));
const collage = JSON.parse(fs.readFileSync(path.join(videoDir, "vox-collage-config.json"), "utf8"));
const handdraw = JSON.parse(fs.readFileSync(path.join(videoDir, "handdraw-story-config.json"), "utf8"));

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

for (const [id, preset] of Object.entries(manifest)) {
  invariant(preset.id === id, `Preset key ${id} must match its id.`);
  invariant(Number.isFinite(preset.duration) && preset.duration > 0, `${id} needs a positive duration.`);
  invariant(Number.isInteger(preset.width) && preset.width > 0, `${id} needs a positive integer width.`);
  invariant(Number.isInteger(preset.height) && preset.height > 0, `${id} needs a positive integer height.`);
  invariant(Array.isArray(preset.beats) && preset.beats[0] === 0, `${id} beat markers must start at zero.`);
  preset.beats.forEach((beat, index) => {
    invariant(Number.isFinite(beat), `${id} beat ${index + 1} must be numeric.`);
    if (index > 0) invariant(beat > preset.beats[index - 1], `${id} beat markers must increase.`);
    invariant(beat < preset.duration, `${id} beat marker ${beat} must be inside the film.`);
  });
}

const collagePreset = manifest["vox-collage"];
invariant(collagePreset, "The vox-collage manifest entry is required.");
invariant(collage.project && typeof collage.project.subject === "string", "Collage project subject is required.");
invariant(Array.isArray(collage.beats) && collage.beats.length > 0, "Collage needs at least one beat.");

const beatIds = new Set();
collage.beats.forEach((beat, index) => {
  const beatDuration = beat.end - beat.start;
  invariant(typeof beat.id === "string" && beat.id.length > 0, `Collage beat ${index + 1} needs an id.`);
  invariant(!beatIds.has(beat.id), `Duplicate collage beat id: ${beat.id}`);
  beatIds.add(beat.id);
  invariant(Number.isFinite(beat.start) && Number.isFinite(beat.end) && beatDuration > 0, `${beat.id} needs a positive time range.`);
  invariant(index === 0 ? beat.start === 0 : beat.start === collage.beats[index - 1].end, `${beat.id} must begin where the previous beat ends.`);
  invariant(/^#[0-9a-f]{6}$/i.test(beat.background), `${beat.id} background must be a six-digit hex color.`);
  invariant(/^#[0-9a-f]{6}$/i.test(beat.ink), `${beat.id} ink must be a six-digit hex color.`);
  invariant(/^#[0-9a-f]{6}$/i.test(beat.accent), `${beat.id} accent must be a six-digit hex color.`);
  invariant(typeof beat.headline === "string" && beat.headline.length > 0, `${beat.id} needs a headline.`);
  invariant(typeof beat.narration === "string" && beat.narration.length > 0, `${beat.id} needs narration.`);
  invariant(Array.isArray(beat.objects) && beat.objects.length >= 3 && beat.objects.length <= 6, `${beat.id} must use three to six paper actors.`);

  const objectIds = new Set();
  beat.objects.forEach((item) => {
    invariant(typeof item.id === "string" && item.id.length > 0, `${beat.id} contains an actor without an id.`);
    invariant(!objectIds.has(item.id), `${beat.id} contains duplicate actor id ${item.id}.`);
    objectIds.add(item.id);
    invariant(typeof item.kind === "string" && item.kind.length > 0, `${beat.id}/${item.id} needs a kind.`);
    invariant(["left", "right", "top", "bottom"].includes(item.from), `${beat.id}/${item.id} has an invalid entry direction.`);
    invariant(Number.isFinite(item.enter) && item.enter >= 0 && item.enter < beatDuration, `${beat.id}/${item.id} entry time must be inside its beat.`);
    for (const key of ["x", "y", "width", "height"]) {
      invariant(Number.isFinite(item[key]) && item[key] >= 0 && item[key] <= 100, `${beat.id}/${item.id} ${key} must be between zero and one hundred.`);
    }
    invariant(item.x + item.width <= 100, `${beat.id}/${item.id} exceeds the horizontal stage.`);
    invariant(item.y + item.height <= 100, `${beat.id}/${item.id} exceeds the vertical stage.`);
  });
});

invariant(collage.beats.at(-1).end === collagePreset.duration, "Collage final beat must end at the manifest duration.");
invariant(JSON.stringify(collage.beats.map((beat) => beat.start)) === JSON.stringify(collagePreset.beats), "Collage beat starts must match the manifest markers.");

const handdrawPreset = manifest["handdraw-story"];
invariant(handdrawPreset && handdrawPreset.kind === "treatment", "The handdraw-story treatment manifest entry is required.");
invariant(handdraw.project && handdraw.project.treatment === "hand-drawn story", "Hand-drawn treatment metadata is required.");
invariant(Array.isArray(handdraw.scenes) && handdraw.scenes.length >= 4 && handdraw.scenes.length <= 8, "Hand-drawn treatment needs four to eight scenes.");

const handdrawIds = new Set();
handdraw.scenes.forEach((scene, index) => {
  invariant(typeof scene.id === "string" && scene.id.length > 0, `Hand-drawn scene ${index + 1} needs an id.`);
  invariant(!handdrawIds.has(scene.id), `Duplicate hand-drawn scene id: ${scene.id}`);
  handdrawIds.add(scene.id);
  invariant(Number.isFinite(scene.start) && Number.isFinite(scene.end) && scene.end > scene.start, `${scene.id} needs a positive time range.`);
  invariant(index === 0 ? scene.start === 0 : scene.start === handdraw.scenes[index - 1].end, `${scene.id} must begin where the previous scene ends.`);
  invariant(typeof scene.caption === "string" && scene.caption.length > 0 && scene.caption.length <= 64, `${scene.id} needs a concise caption.`);
  invariant(typeof scene.art === "string" && scene.art.length > 0, `${scene.id} needs an art identifier.`);
  invariant(/^#[0-9a-f]{6}$/i.test(scene.accent), `${scene.id} accent must be a six-digit hex color.`);
  invariant(/^#[0-9a-f]{6}$/i.test(scene.wash), `${scene.id} wash must be a six-digit hex color.`);
});

invariant(handdraw.scenes.at(-1).end === handdrawPreset.duration, "Hand-drawn final scene must end at the manifest duration.");
invariant(JSON.stringify(handdraw.scenes.map((scene) => scene.start)) === JSON.stringify(handdrawPreset.beats), "Hand-drawn scene starts must match the manifest markers.");

console.log(`Checked ${Object.keys(manifest).length} presets, ${collage.beats.length} collage beats, and ${handdraw.scenes.length} hand-drawn scenes.`);
