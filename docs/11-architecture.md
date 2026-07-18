# Architecture

The workflow has two loops:

- Creative loop: question, script, beat sheet, visual actors.
- Render loop: app state, browser frames, stitching, QC.

## End-To-End Flow

```mermaid
flowchart LR
  A["Business Question"] --> B["Voiceover Script"]
  B --> C["Beat Sheet"]
  C --> D["Word-Level Timing"]
  D --> E["Timeline Anchors"]
  E --> F["Video Harness"]
  F --> G["Browser Frame Capture"]
  G --> H["FFmpeg Encode"]
  H --> I["Final MP4"]
  I --> J["QC Review"]
  J --> C
```

## App-Native Film Architecture

```mermaid
flowchart TB
  subgraph Product["Product App"]
    P1["Real Routes"]
    P2["Seeded Demo Data"]
    P3["Film-Driven Components"]
  end

  subgraph Harness["Video Harness"]
    H1["Fixed Viewport"]
    H2["Scene Timeline"]
    H3["window.__filmSetT(t)"]
    H4["Render Mode CSS"]
  end

  subgraph Capture["Capture Pipeline"]
    C1["Puppeteer / Playwright"]
    C2["Frame PNGs"]
    C3["FFmpeg Video"]
    C4["Mux Voiceover"]
  end

  Product --> Harness --> Capture
```

## Hybrid Film Architecture

```mermaid
flowchart LR
  A["Generated Human Setup"] --> B["Bridge Shot"]
  B --> C["Real UI Acting Sequence"]
  C --> D["Proof Artifact"]
  D --> E["Outcome Close"]

  V["Voiceover + Word Timing"] --> A
  V --> C
  V --> E
```

## The Render Contract

Every video page should expose:

```js
window.__filmReady = true;
window.__filmDuration = 24;
window.__filmSetT = (t) => {
  // Set the frame to global second t
};
```

This makes the film inspectable. A reviewer can jump to any timestamp and see the exact frame.

## Preset Architecture

The starter keeps format metadata separate from scene implementation:

```text
preset-manifest.json  dimensions, duration, label, and output contract
default-preset.json   CLI-selected project default
presets.js            resolver shared by preview and render mode
VideoApp.jsx          render globals, preview controls, and preset routing
*Film.jsx             format-specific scene composition
motion.js             deterministic enter / hold / exit helpers
```

The URL can select a preset with `?preset=scroll-story`, `?preset=launch-film`, `?preset=vox-collage`, or the optional `?preset=handdraw-story` treatment. In a generated project, the CLI writes the chosen value to `default-preset.json`; omitting `--type` still selects `classic`.

All presets use the same browser globals, so adding a format does not require a new renderer. The manifest is the authoritative source for duration and default viewport dimensions.

## Timing Data Shape

Keep timing portable and simple:

```json
{
  "beat": "b02",
  "duration": 12.4,
  "anchors": [
    { "time": 1.2, "word": "gap", "actor": "gap-card", "action": "hot-ring" },
    { "time": 4.8, "word": "explains", "actor": "drawer", "action": "open" }
  ]
}
```

The implementation can be React, Vue, Svelte, Canvas, SVG, or plain HTML. The contract matters more than the framework.

