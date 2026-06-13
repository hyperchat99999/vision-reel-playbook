# Common Failure Modes

## Static Screen Syndrome

Problem: the product screen is real, but nothing changes while the VO continues.

Fix: assign one actor per sentence. If the sentence has no actor, cut it or build the actor.

## Blank Frame From Scroll Overshoot

Problem: the camera scrolls past meaningful content and leaves a mostly empty viewport.

Fix: measure scroll rests with the DOM, grab frames at each rest, and keep the acting region center-frame.

## Decorative Highlight Boxes

Problem: overlays float over the product and drift out of alignment.

Fix: dim non-acting regions inside the component and use native product states where possible.

## Too Much Text

Problem: the frame becomes a slide.

Fix: one headline, a few short labels, and one active proof point. Let the VO carry the paragraph.

## AI Footage Feels Generic

Problem: generated clips look like stock video and do not advance the product story.

Fix: use generated footage only for human setup or transition. Cut quickly into real UI proof.

## Captions Drift

Problem: captions were timed by estimate rather than actual audio.

Fix: transcribe the final audio and align captions to word timings.

## Renderer Is Alive But Output Is Dead

Problem: logs appear active while files stop growing.

Fix: monitor artifacts on disk and make the stitch resumable.

## Voice Swap Breaks Timing

Problem: a new voice reads faster or slower and the old animation no longer lands.

Fix: remeasure clip durations, regenerate word timestamps, and re-lock windows.

