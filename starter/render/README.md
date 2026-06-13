# Render Scripts

The sample renderer captures frames from the browser and stitches them with FFmpeg.

## One-Command Sample

From the repo root:

```bash
npm run render:sample
```

This starts the local app, captures frames, stitches `assets/sample-clean.mp4`, and stops the app.

## Manual Usage

Start the app first:

```bash
npm run dev
```

Then run:

```bash
node starter/render/render.cjs --url http://localhost:5173/video.html?render=1 --out out/sample.mp4 --fps 30
```

To mux a voiceover track into the render, add `--audio path/to/voice.mp3`. Without it, the render is silent.

The app must already be running.

The script expects `puppeteer` and `ffmpeg-static` to be installed in `starter/app/node_modules` or available to Node resolution.

## Render Contract

The page must expose:

```js
window.__filmReady
window.__filmDuration
window.__filmSetT(t)
```

The renderer waits for readiness, then drives `t` frame by frame.
