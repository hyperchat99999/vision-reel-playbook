# Hand-Drawn Story Treatment

`handdraw-story` is an optional visual treatment for warm, causal stories. It does not replace the three signature communication formats. Use it when a founder, customer, creator, or product-origin story needs to feel human and comprehensible without generic B-roll.

The included demo solves a common creator problem: briefs, voice notes, screenshots, and format ideas begin disconnected. Five scenes show how one question creates direction, the right format shapes the journey, and every claim gains visible proof.

## Preview And Render

```bash
npx create-vision-reel@latest my-film --type handdraw-story
cd my-film
npm run setup
npm run dev
```

Open `http://localhost:5173/video.html?preset=handdraw-story`, then render:

```bash
npm run render:handdraw-story
```

The 720 × 960, 20-second render includes a bundled local fallback score, preview still, and contact sheet. It needs no image, video, or audio generation service. The public showcase master replaces that fallback with its section of a source-documented ElevenLabs Music v2 suite.

## Why The Reveal Stays Stable

Each scene starts from one original illustrated color master and is rendered in two aligned passes:

1. An ink pass is clipped from left to right.
2. A low-saturation color pass made from the exact same geometry follows it.
3. The scene holds long enough for the caption and causal connection to read.
4. A chapter transition resets the stage for the next idea.

Because the ink pass is derived locally from the exact color master, edges cannot drift. Do not generate the two layers independently.

The source masters live under `design-references/handdraw-story/masters/`. Rebuild the optimized 720 × 960 WebP runtime layers with:

```bash
npm run handdraw:layers
```

## Customize

Edit `starter/app/src/video/handdraw-story-config.json` for scene timing, captions, palette, and art identifiers. Replace or extend the color masters, rerun `npm run handdraw:layers`, then use `HanddrawStoryFilm.jsx` for reveal and camera choreography. Keep:

- four to eight scenes;
- one readable idea per scene;
- sparse paper-white space;
- no more than two or three people or major objects per composition;
- a consistent accent thread across cause and effect;
- captions under 64 characters;
- every animation as a pure function of timeline time.

For external art, keep source records and run the IP scan. Generated assets from other repositories are not automatically covered by their code license.

## Quality Control

```bash
npm run check
node starter/scripts/blank-frame-check.cjs frames/handdraw-story
```

Inspect the contact sheet for aligned ink/color edges, sufficient caption holds, clean chapter changes, and meaningful visual continuity. A blank-frame check cannot judge those qualities.

## Design Research And License

The treatment was informed by the MIT-licensed [handdraw-story-video](https://github.com/xiejunjie524/handdraw-story-video), especially its aligned color-master/derived-line workflow, directional ink-and-color reveal, sparse staging, and scene validation. Vision Reel's React component, illustrated masters, storyline, copy, score plan, palettes, and demo assets are original. No upstream generated artwork is included.
