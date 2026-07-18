# Cinematic Scroll Story Energy Pass

## Objective

Increase energy without turning the film into unrelated decoration. Every new motion cue must clarify story progress, connect a claim to visible evidence, mark a chapter change, or prove render integrity.

## Visual Changes

- Beat-synced energy rail inside the camera frame.
- Smooth chapter impacts at the four narrative boundaries.
- Directional speed accents that reinforce vertical travel.
- Persistent claim → visible state → proof → frame check → trust ticker.
- Claim → visible action → trust map in the writing chapter.
- Claim → UI state → proof linked status in the interface chapter.
- 24 fps, zero-drop, and frame-hash indicators in the capture chapter.
- Existing copy, identity, core composition, canvas, and 18-second public contract preserved.

All movement remains a deterministic function of timeline time and honors reduced-motion mode.

## Audio Changes

The no-cost score is synthesized locally by `starter/scripts/make-demo-audio.cjs` at 120 BPM. It contains deterministic kick, snare, stereo hats, bass movement, tonal bed, melodic pulses, chapter risers, and impact chimes.

The generator now:

- detects and rejects non-finite samples;
- applies soft saturation and RMS-aware mastering;
- leaves codec headroom before AAC export;
- produces an exact 18-second 48 kHz stereo WAV.

## Final Master QA

| Check | Result |
| --- | --- |
| Output | `assets/scroll-story-demo.mp4` |
| Canvas | 1080 × 1920 |
| Frame rate | 24 fps |
| Duration | 18.04 seconds container duration |
| Video | H.264 High |
| Audio | AAC stereo, 48 kHz |
| Average audio level | −14.6 dB |
| Peak audio level | −1.1 dB |
| Frame scan | 433 frames; no low-content frames below 4.5 |
| Contact sheet | `assets/scroll-story-demo-contact-sheet.jpg` |
| Paid generation services | None |

## Deterministic VOX Music Update

The same local audio engine now supplies the no-cost VOX collage master at `assets/vox-collage-demo.mp4`. Its previous track averaged approximately −29.4 dB and was technically present but difficult to hear. The replacement averages −16.7 dB with a −2.9 dB peak and remains fully local, reproducible, and embedded in the gallery MP4.
