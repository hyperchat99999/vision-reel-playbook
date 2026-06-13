# Timeline And Word Sync

Voiceover timing should drive visual timing.

## Word Timestamps

After the final VO is recorded or generated, transcribe it to word-level timestamps:

```json
{
  "duration": 8.42,
  "words": [
    { "w": "The", "s": 0.00, "e": 0.08 },
    { "w": "plan", "s": 0.08, "e": 0.31 }
  ]
}
```

Use the timestamps to set visual anchors.

## Anchor Rules

- Fire a visual slightly before or on the trigger word.
- Do not rely on transcript text matching alone. Transcripts can mishear words.
- Use the timing values from the word file.
- Mark important constants with comments such as `ANCHOR: word "approved"`.

## Beat Windows

A practical window model:

```text
window = lead + voiceoverDuration + tail
lead = 0.3 seconds
tail = 0.6 seconds
```

The lead lets the scene breathe before narration starts. The tail lets the beat end settled.

## Ending Settled

The last important visual anchor should finish before the beat ends.

Use this rule:

```text
lastAnchor <= windowEnd - 0.8 seconds
```

If a stream or count-up cannot finish, shorten the displayed text or simplify the animation.

## Scroll As Camera Move

Treat scroll like a camera move:

- Use measured rest points.
- Ease between rests.
- Keep the acting region center-frame.
- Do not scroll during important count-ups or typewriter streams.
- Use at most a few rests per beat.

Blank frames often come from scroll overshoot. QC every scroll destination.

