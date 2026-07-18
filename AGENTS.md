# AGENTS.md

Instructions for development assistants and contributors working in this repo. If you are a non-coder, you can paste a request like *"set up this repo, render the sample film, then help me customize it for my brief"* into your preferred assistant — this file tells it how.

## What this repo is

Vision Reel Playbook is a method plus a runnable starter kit for making short films where a real interface acts out a voiceover, captured deterministically and stitched into an MP4. The playbook lives in `docs/`; the runnable kit lives in `starter/`.

## Setup

Requires Node.js 20+. From the repo root:

- `npm run setup` — installs the starter's dependencies. Puppeteer downloads its own browser and FFmpeg ships as the bundled `ffmpeg-static` dependency, so there is nothing else to install. No paid APIs are needed to set up the kit or render the real UI; generated voiceover or generated footage are optional paid add-ons.

## Key commands (run from the repo root)

- `npm run render:scroll-story` — render the 18-second portrait signature preset with its local score.
- `npm run render:launch-film` — render the 12-second landscape signature preset with its local score.
- `npm run render:vox-collage` — render the 15-second portrait paper-collage explainer with its local score.

- `npm run dev` — start the local app at `http://localhost:5173/video.html?render=1`.
- `npm run render:sample` — render the sample film to `assets/sample-clean.mp4` (plus a still and a QC contact sheet). Silent by default.
- `npm run gif` — regenerate `assets/sample.gif` from the rendered MP4.
- `npm run check` — run every safety/quality gate (IP scan, timing, gallery, script syntax, JSON, links). Run this before publishing.
- `npm run qc:blank` / `npm run qc:sheet` — blank-frame detector / contact-sheet generator.

## The render contract (do not break)

The video page must keep exposing these browser globals; the renderer depends on them:

- `window.__filmReady` — set `true` once the app is mounted and ready.
- `window.__filmDuration` — total film length in seconds.
- `window.__filmSetT(t)` — set every visual state as a pure function of time `t`.

These are defined in `starter/app/src/video/VideoApp.jsx` and documented in `docs/06-ui-as-film-set.md` and `docs/11-architecture.md`.

## Customizing a film

- Signature scenes: `starter/app/src/video/ScrollStoryFilm.jsx`, `starter/app/src/video/LaunchFilm.jsx`, and `starter/app/src/video/VoxCollageFilm.jsx`.
- Collage project, beat, narration, palette, object, and assembly configuration: `starter/app/src/video/vox-collage-config.json`.
- Preset metadata and project default: `preset-manifest.json` and `default-preset.json` in the same directory.
- Signature art direction and responsive behavior: `starter/app/src/video/presets.css`.

- Beats / timeline: `starter/app/src/video/timeline.js`.
- Scenes and visual actors: `starter/app/src/video/VideoApp.jsx`.
- The fictional product UI: `starter/app/src/components/ProductScreens.jsx`.
- Brief, beat sheet, and word anchors: copy and fill in the files in `templates/`.
- Keep rendering deterministic: every visual state must be a pure function of `t` — no `Math.random()`, no wall-clock dates, no async timers during capture. Transitions are disabled under `body.render` (render mode).

## Adding a voiceover

The sample renders silent. To mux an audio track, pass `--audio` to the renderer:

```bash
node starter/render/render.cjs --url http://localhost:5173/video.html?render=1 --out out/film.mp4 --fps 30 --audio path/to/voice.mp3
```

Or drop `voice.mp3` (or `.wav` / `.m4a`) into `starter/sample-assets/` and `npm run render:sample` will pick it up automatically.

## Helping someone shape the idea first

If the user does not yet know what their film should be, point them to [`prompts/idea-to-film-consultant.md`](prompts/idea-to-film-consultant.md) (or run it together): a discovery interview that produces a filled brief, beat sheet, and word anchors you can then build from.

## IP safety (important)

Everything public-facing must stay fictional. Never add real client names, logos, screenshots, prompts, transcripts, voice files, or API keys. Run `npm run check` (it includes the IP scan) before committing or publishing. See `docs/09-ip-safety.md`.
