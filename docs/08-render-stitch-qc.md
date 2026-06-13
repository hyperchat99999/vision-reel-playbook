# Render, Stitch, And QC

Rendering is a production pipeline. Make it resumable and check artifacts.

## Render Flow

1. Start the app server.
2. Open `video.html?render=1`.
3. Wait for `window.__filmReady === true`.
4. For each frame, call `window.__filmSetT(t)`.
5. Wait for two animation frames.
6. Screenshot the browser.
7. Encode frames with FFmpeg.
8. Mux voiceover.
9. Concatenate beats.

## Determinism

Make the same time render the same frame:

- Disable CSS transitions in render mode.
- Freeze wall-clock dates.
- Avoid `Math.random()` during render.
- Use deterministic jitter when needed.
- Keep animation derived from `t`.
- Avoid async timers that change state after capture.

## Artifact-Based Progress

Do not trust long log tails.

Check:

- Output frame count.
- Output file size.
- File modification time.
- App server health.
- Renderer process health.

Make render scripts resumable so a crash does not restart the whole film.

## QC Contact Sheet

For every beat, grab:

- First frame.
- Early narration frame.
- Midpoint.
- Each important word anchor.
- End frame.

Assemble these into a contact sheet and inspect visually.

## Blank-Frame Checks

Blank frames usually come from:

- Scroll overshoot.
- Hidden route state.
- Failed asset load.
- Clip window translated instead of inner content.
- Empty framework scene.
- White cards on white background with no content.

The starter includes a simple low-content detector.

## Release Checks

Before release:

- Watch the full clean cut.
- Spot-check every beat in the final assembled file.
- Check audio sync.
- Check readable text.
- Check spoken numbers.
- Run IP scans.
- Confirm no API keys or private paths are present.

