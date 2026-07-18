# Signature Presets

Vision Reel ships with three signature formats in addition to the backward-compatible `classic` preset. All use the same deterministic render contract and can be created, previewed, customized, and rendered without a paid service.

## Create A Project

```bash
npx create-vision-reel@latest my-film --type scroll-story
npx create-vision-reel@latest my-film --type launch-film
npx create-vision-reel@latest my-film --type vox-collage
```

The CLI writes the selection to `starter/app/src/video/default-preset.json`. Omit `--type` to keep the original `classic` behavior.

## Preview

```text
http://localhost:5173/video.html?preset=scroll-story
http://localhost:5173/video.html?preset=launch-film
http://localhost:5173/video.html?preset=vox-collage
```

The preview toolbar offers preset tabs and an accessible timeline slider. Use Left/Right Arrow for small steps, Page Up/Page Down for larger moves, and Home/End for the film boundaries. The scroll-story preview also accepts the mouse wheel. The interface honors the operating system's reduced-motion preference.

## Render

```bash
npm run render:scroll-story
npm run render:launch-film
npm run render:vox-collage
```

| Preset | Canvas | Duration | Public output |
| --- | ---: | ---: | --- |
| `scroll-story` | 1080 × 1920 | 18 seconds | `assets/scroll-story-demo.mp4` |
| `launch-film` | 1920 × 1080 | 12 seconds | `assets/launch-film-demo.mp4` |
| `vox-collage` | 720 × 1280 | 15 seconds | `assets/vox-collage-demo.mp4` |

Signature demos default to 24 fps; use `--fps 30` for a 30 fps delivery. Override dimensions with `--width` and `--height`. Each command also produces a still and a contact sheet.

## Audio

The repository generates an original deterministic procedural score for each signature preset, keeping default rendering local and reproducible. The score generator includes synthesized drums, bass, tonal beds, transition impacts, stereo accents, and preset-specific chapter cues. The no-cost scroll-story and VOX demo masters embed these local tracks directly in the MP4s.

Replace the local score with licensed music or voiceover using:

```bash
node starter/render/render-sample.cjs --preset launch-film --audio path/to/audio.mp3
```

The optional VOX studio cut demonstrates an external ElevenLabs narration and Music v2 pass, but neither service is required by the preset or renderer. See [`19-no-cost-video-generation.md`](19-no-cost-video-generation.md) for the complete paid-service-free workflow.

## Customize

- Edit labels, dimensions, or duration in `starter/app/src/video/preset-manifest.json`.
- Edit the portrait composition in `starter/app/src/video/ScrollStoryFilm.jsx`.
- Edit the landscape composition in `starter/app/src/video/LaunchFilm.jsx`.
- Edit the collage story, narration, palette, objects, placement, and timing in `starter/app/src/video/vox-collage-config.json`.
- Extend the collage object vocabulary in `starter/app/src/video/VoxCollageFilm.jsx`.
- Edit shared motion curves in `starter/app/src/video/motion.js`.
- Edit color, type, spacing, depth, and responsive behavior in `starter/app/src/video/presets.css`.

Keep every scene a pure function of timeline time. Do not use wall-clock time, random values, or animation state that the renderer cannot reproduce.

## Quality Checks

```bash
npm run check
node starter/scripts/blank-frame-check.cjs frames/scroll-story
node starter/scripts/blank-frame-check.cjs frames/launch-film
node starter/scripts/blank-frame-check.cjs frames/vox-collage
```

Inspect the generated contact sheets as well as the MP4s. A passing blank-frame check cannot prove that type is readable or a transition is elegant.

## Design Research

The scroll interaction model was informed by [cinematic-scroll-prompt-kit](https://github.com/amirmushichge/cinematic-scroll-prompt-kit): normalized progress, explicit enter/hold/exit phases, and responsive QA. The collage workflow was informed by [VOX-COLLAGE-BROLL](https://github.com/MegaTroll222/VOX-COLLAGE-BROLL): metaphor gates, meaning-led palettes, constrained paper groups, assemble-from-empty motion, and frame-based QA. Vision Reel's code, compositions, UI, copy, color systems, and assets are original. See [`ACKNOWLEDGEMENTS.md`](../ACKNOWLEDGEMENTS.md).
