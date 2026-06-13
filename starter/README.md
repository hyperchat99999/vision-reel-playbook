# Vision Reel Starter

This starter is deliberately small. It shows the method without using any private assets.

## Contents

- `app/`: fictional React/Vite product app.
- `app/video.html`: video harness entry.
- `video-harness/`: explanation of the render contract.
- `render/`: browser frame renderer.
- `scripts/`: QC utilities.
- `sample-data/`: fictional brief.
- `sample-assets/`: empty public-safe asset folder.

## Run The App

From the repo root, install dependencies once:

```bash
npm run setup
```

Then start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:5173/
http://localhost:5173/video.html?render=1
```

## Render A Sample

From the repo root (run `npm run setup` first if you have not):

```bash
npm run render:sample
```

This starts the local app, captures frames, builds the sample film at `assets/sample-clean.mp4` (plus a preview still in `assets/` and a QC contact sheet in `qc/`), and stops the app. The sample renders silent by default — pass a voiceover with `--audio` (see manual rendering below).

For advanced/manual rendering you choose your own output path (start the app first with `npm run dev`):

```bash
node starter/render/render.cjs --url http://localhost:5173/video.html?render=1 --out out/sample.mp4 --fps 30
```

To mux a voiceover track into the render, add `--audio`:

```bash
node starter/render/render.cjs --url http://localhost:5173/video.html?render=1 --out out/film.mp4 --fps 30 --audio path/to/voice.mp3
```

## Run Safety Checks

From the repo root:

```bash
npm run scan:ip
npm run check:timing
```
