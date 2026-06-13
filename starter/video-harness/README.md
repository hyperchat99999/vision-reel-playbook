# Video Harness

The starter app exposes this render contract from `starter/app/video.html`:

```js
window.__filmReady = true;
window.__filmDuration = 24;
window.__filmSetT = (t) => {
  // render the film at global second t
};
```

A renderer can call `__filmSetT(12.5)`, wait for the browser to paint, and capture a frame.

## Why This Contract Exists

Screen recordings depend on real-time playback. Frame rendering depends on state.

The harness makes each frame reproducible:

- The app does not need to play in real time.
- Slow frames do not create dropped frames.
- The same timestamp can be inspected repeatedly.
- QC tools can jump directly to word anchors.

## Adapting It

In a real app:

- Mount the same product pages inside a video-only entry.
- Seed persona, route, and selected data before the page mounts.
- Pass `{ t, beat }` through a context or optional prop.
- Keep production behavior unchanged when film mode is absent.

