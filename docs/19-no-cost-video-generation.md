# No-Cost Video Generation

Vision Reel includes a complete code-driven video-generation workflow that runs locally. It does not require Higgsfield, an image model, ElevenLabs, a stock-media subscription, or any paid API.

This is not a reduced demo mode. The cinematic scroll story, editorial launch film, and VOX collage explainer are real motion compositions built from deterministic React, CSS, local browser capture, procedural audio, and FFmpeg.

## What The Pipeline Generates

One render command produces:

- a finished H.264/AAC MP4;
- every source frame as a PNG;
- an original deterministic stereo score as a WAV;
- a representative poster still;
- an eight-frame contact sheet for visual review.

The same inputs produce the same timing, copy, layout, and motion on every render. There is no prompt drift and no per-render generation charge.

## Create A Film

```bash
npx create-vision-reel@latest my-film --type scroll-story
cd my-film
npm run setup
npm run render:scroll-story
```

Choose another included format when needed:

```bash
npx create-vision-reel@latest my-film --type launch-film
npx create-vision-reel@latest my-film --type vox-collage
```

The generated project contains the application, renderer, procedural music generator, QA utilities, templates, and documentation. After the initial npm dependency download, rendering is local.

## How It Works

```text
brief or JSON configuration
        ↓
React composition + deterministic timeline time
        ↓
CSS typography, interface actors, depth, and transitions
        ↓
local browser captures every frame at 24 fps
        ↓
local procedural score is synthesized to stereo WAV
        ↓
FFmpeg combines frames and audio into MP4
        ↓
still + contact sheet + blank-frame and regression checks
```

No wall-clock animations or random layout values are used. Every visible state is a pure function of timeline time, which makes individual moments inspectable and exports reproducible.

## Customize The Visual Story

For the cinematic scroll story, edit:

- `starter/app/src/video/ScrollStoryFilm.jsx` for copy, proof actions, chapter structure, and timing;
- `starter/app/src/video/presets.css` for typography, color, depth, interface styling, and responsive treatment;
- `starter/app/src/video/preset-manifest.json` for canvas and duration.

For the VOX collage explainer, most adaptations only require `starter/app/src/video/vox-collage-config.json`. Each beat defines its problem, narration, palette, paper actors, placement, and entry order.

Keep every visual action connected to meaning. A progress rail should show story position; a cursor should reveal evidence; a timeline should prove synchronization; a status check should prove completion.

## Generate The Music Locally

The included audio generator creates an original score from synthesized drums, bass, tonal beds, transitions, and stereo accents:

```bash
node starter/scripts/make-demo-audio.cjs \
  --preset scroll-story \
  --out qc/scroll-story-score.wav
```

Use `--preset vox-collage` for the collage score. The public no-cost demos embed these tracks in their MP4 files. The music is generated from repository code and requires no account or audio download.

To use your own properly licensed audio instead:

```bash
node starter/render/render-sample.cjs \
  --preset scroll-story \
  --audio path/to/your-track.mp3
```

## Preview And Inspect

Start the local preview:

```bash
npm --prefix starter/app run dev
```

Open one of these URLs:

```text
http://localhost:5173/video.html?preset=scroll-story
http://localhost:5173/video.html?preset=launch-film
http://localhost:5173/video.html?preset=vox-collage
```

Scrub the timeline or use the keyboard controls to inspect entrances, holds, exits, and chapter boundaries before rendering.

## Quality Checks

```bash
npm run check
npm --prefix starter/app run build
node starter/scripts/blank-frame-check.cjs frames/scroll-story
node starter/scripts/blank-frame-check.cjs frames/vox-collage
```

Also watch each MP4 with sound and inspect its contact sheet. Confirm that:

- the opening establishes the problem immediately;
- each chapter contains a meaningful secondary action;
- cuts and audio impacts land together;
- labels remain readable on a phone-sized canvas;
- the score is audible without clipping;
- the final proof state holds long enough to understand.

## Cost And Tradeoffs

| Route | External generation cost | Strength | Tradeoff |
| --- | ---: | --- | --- |
| Local code-driven render | $0 per render | Exact copy, reproducible motion, unlimited iteration | Uses local CPU time and code-native visual actors |
| Optional generated-media pass | Provider dependent | Organic imagery and physical motion | Credits, generation variance, and stricter provenance QA |

Use the no-cost route by default. Add generated imagery only when it materially improves the explanation and the same result cannot be produced more clearly with deterministic type, interface evidence, or code-native collage actors.
