# VOX Collage Explainer

The `vox-collage` preset turns a product, process, creator problem, or abstract concept into a short editorial paper-collage proof loop. The included demo addresses a specific production problem: creators often have a voiceover, screenshots, and footage, but no reliable way to connect each spoken claim to the visual evidence that proves it.

## Create, Preview, And Render

```bash
npx create-vision-reel@latest my-explainer --type vox-collage
cd my-explainer
npm run setup
npm run render:vox-collage
```

Preview with:

```text
http://localhost:5173/video.html?preset=vox-collage
```

The default output is a 15-second 720 × 1280 MP4 at 24 fps. The render also creates a preview still, contact sheet, source frames, and a deterministic local score.

## No-Cost Video Generation

The command above is the complete no-cost version. React and CSS generate the paper actors, deterministic timeline time drives every assembly action, the local browser captures all 360 frames, the repository synthesizes an original stereo score, and FFmpeg creates the final MP4. It requires no Higgsfield, image model, ElevenLabs account, stock library, or paid API.

Use the optional studio-cut workflow only when organic generated imagery materially improves the explanation. The default code-native version remains the recommended route for unlimited iteration, exact labels, repeatable motion, and zero per-render generation cost. The full local pipeline is documented in [`19-no-cost-video-generation.md`](19-no-cost-video-generation.md).

## Story Contract

Every beat must answer five questions:

1. What concrete problem or idea must the viewer understand?
2. What one visual relationship makes that meaning obvious?
3. Which three to six paper actors are essential?
4. In what order should they assemble and act?
5. What visible evidence proves the beat is complete?

The included creator story uses this sequence:

| Beat | Problem or proof | Connected action |
| --- | --- | --- |
| Creator problem | The voice says “proof,” while the footage is generic filler. | Transcript, random B-roll bin, timeline gap, cursor, and mismatch warning assemble. |
| Vision Reel method | Each important word is assigned a relevant visual actor. | The “proof” anchor links to a real UI state and both lock onto the timeline. |
| Finished proof loop | Every claim lands with evidence and passes delivery checks. | Reel preview, moving playhead, staggered QC rows, export progress, and publish seal complete. |

## Configuration

Edit `starter/app/src/video/vox-collage-config.json`. The component reads the file directly, so most adaptations require no JSX changes.

```json
{
  "project": {
    "subject": "Your product or concept",
    "mode": "product",
    "eyebrow": "Paper collage explainer",
    "closingLine": "One idea. Clearly proved."
  },
  "beats": [
    {
      "id": "problem",
      "start": 0,
      "end": 5,
      "kicker": "01 / The problem",
      "headline": "Name the concrete friction.",
      "narration": "One plain spoken line sized to fit the beat.",
      "background": "#b9431f",
      "ink": "#171411",
      "accent": "#f5df70",
      "objects": []
    }
  ]
}
```

Each object supports:

- `id`: stable identifier.
- `kind`: a visual actor from the built-in vocabulary.
- `label`: deterministic caption on the paper tab.
- `x`, `y`, `width`, `height`: percentage-based placement.
- `rotate`: final paper rotation in degrees.
- `enter`: local beat time when assembly begins.
- `from`: `left`, `right`, `top`, or `bottom`.

Built-in object kinds cover transcripts, word anchors, asset bins, edit timelines, mismatches, cursors, product-proof panels, connectors, sync badges, reel previews, QC cards, export progress, and approval seals. Add a new rendering grammar in `VoxCollageFilm.jsx` only when an explanation needs a genuinely new actor.

## Motion Rules

- Build structure first, evidence second, connection third, and the result last.
- Use smooth deterministic progress derived only from timeline time.
- Keep secondary actions meaningful: highlight the anchor, complete the link, move the playhead, reveal checks, or fill the export bar.
- Avoid decorative wobble, random drift, wall-clock animation, and perpetual motion.
- Start each beat with enough empty field to make assembly legible.
- Hold the completed relationship long enough to read.
- Keep generated imagery text-free; add exact labels in the deterministic React layer.

## External Generation Guardrails

External media is optional. The package and default render require no paid service. When a project benefits from generated collage plates or assembly motion, use the same gates that protect cost and quality:

1. Approve the metaphor and shot plan before generation.
2. Approve each completed still before video generation.
3. Generate the video with an exact first-frame and approved last-frame relationship.
4. Strip generated audio and add licensed narration or music separately.
5. Inspect contact sheets, first frames, end-frame comparisons, dimensions, duration, and audio streams.

For the public demo development pass, the fixed Higgsfield budget is:

| Item | Model and setting | Maximum cost |
| --- | --- | ---: |
| Three final stills | Nano Banana 2 Lite, `thinking: HIGH`, 9:16 | 3 credits |
| Three assembly clips | Seedance 2.0 Mini, 480p, 5 seconds, generated audio off | 15 credits |
| Repair reserve | One five-second video retry plus two still repairs | 7 credits |
| **Total ceiling** | | **25 credits** |

No generated clip may exceed seven seconds. Do not spend the repair reserve on cosmetic differences that do not damage meaning, continuity, framing, or delivery quality.

## Voice And Music

Keep each narration line within its five-second beat. Generate and measure each line independently, trim trailing silence, and use only a small tempo correction when necessary. Keep one narrator voice across the entire film. Music should support paper assembly and transitions without competing with speech.

The repository's fallback score is local and deterministic. For a local render, supply approved audio with:

```bash
node starter/render/render-sample.cjs --preset vox-collage --audio path/to/final-audio.mp3
```

For the optional studio pass, generate and measure each ElevenLabs line independently, then place it inside the matching five-second block. Higgsfield's generic `explainer_video` assembler uses fixed ten-second blocks; do not use it for this preset because it expands three five-second clips to 30 seconds. The documented studio-cut mixer preserves each Seedance clip at native speed, places narration inside its own block, ducks the music beneath speech, and exports an exact 15-second master.

The included studio-cut reference uses the upbeat `Vision Reel Spark` voice and a 128 BPM ElevenLabs Music v2 instrumental with transition lifts at five and ten seconds. Exact model settings, source filenames, job IDs, and measured durations are recorded under `design-references/vox-collage/`.

Reproduce the final studio mix from approved local sources with:

```bash
node starter/scripts/mix-vox-collage-studio.cjs \
  --clip1 path/to/problem.mp4 \
  --clip2 path/to/method.mp4 \
  --clip3 path/to/payoff.mp4 \
  --music path/to/music.mp3 \
  --voice1 path/to/problem-voice.mp3 \
  --voice2 path/to/method-voice.mp3 \
  --voice3 path/to/payoff-voice.mp3 \
  --out assets/vox-collage-studio.mp4
```

The mixer trims each source to five seconds, preserves native motion speed, removes the payoff source's intentional one-frame empty lead-in, places the three narration takes at configurable block offsets, sidechain-ducks the score, and exports a 15-second 480 × 854 H.264/AAC master. Override the source-frame trims with `--clip-start-frames 0,0,0` when your own clips have no empty lead-in.

## Quality Checks

```bash
npm run check
npm --prefix starter/app run build
npm run render:vox-collage
node starter/scripts/blank-frame-check.cjs frames/vox-collage
```

Then inspect:

- the dense contact sheet for assembly order and transition collisions;
- the first frame for clean intentional negative space;
- each five-second boundary for headline or object overlap;
- the final frame for a complete, readable proof relationship;
- the MP4 for correct dimensions, frame rate, duration, and audio;
- reduced-motion preview behavior and keyboard timeline controls.

The optional generated studio cut is also checked for an exact 15.00-second duration, 480p-class dimensions, three five-second source clips, a continuous audio bed, narration placement inside each block, and no video time-stretching.

## Attribution

The production gates, paper-collage constraints, meaning-led palettes, and frame-based QA were informed by [VOX-COLLAGE-BROLL](https://github.com/MegaTroll222/VOX-COLLAGE-BROLL), an English adaptation of [gbro-collage-broll](https://github.com/pyang5166/gbro-collage-broll). Vision Reel's implementation, creator-problem story, JSON schema, React composition, typography, interface evidence, and motion system are original. See [`ACKNOWLEDGEMENTS.md`](../ACKNOWLEDGEMENTS.md).
