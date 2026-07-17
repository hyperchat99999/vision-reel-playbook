# Development instructions

This project renders a deterministic film from a local React interface.

Before changing code, run `npm run check`. After changing code, run it again and render the sample when the render pipeline or visual output changed.

The video page must keep exposing `window.__filmReady`, `window.__filmDuration`, and `window.__filmSetT(t)`. Visual state must be a pure function of time: do not use randomness, wall-clock dates, or asynchronous timers during capture.

Everything public-facing must remain fictional. Never add private names, logos, screenshots, prompts, recordings, credentials, or client data.
