# VOX collage — Seedance and assembly QA

## Generation contract

- Model: Seedance 2.0 Mini (`seedance_2_0_mini`)
- Resolution request: `480p`
- Duration request: 5 seconds per clip
- Aspect: `9:16`
- Bitrate mode: `high`
- Native generated audio: disabled
- Camera: locked overhead
- Motion: connected cause-and-effect paper mechanics with eased arrivals and a stable final hold
- Credit cost: 5 credits per successful clip; 15 credits for three clips

| Beat | Seedance job | Approved end image | Local clip | QA status |
| --- | --- | --- | --- | --- |
| Creator mismatch | `06c13dd3-b5fa-4a03-a275-acd3db384c2c` | `af1ef63d-efd7-4af5-bd10-e798b2249b6d` | `01-creator-mismatch.mp4` | Pass — pending final master review |
| Meaning lock | `a66cb2cd-5fc6-48b4-84d2-284842e46228` | `88867765-9cde-4809-b163-9abca63702c3` | `02-meaning-lock.mp4` | Pass — pending final master review |
| Proof loop | `25f24e18-ac27-45cc-9671-7e2059f57e20` | `98f6ef49-034c-4e15-b80b-873af809d35b` | `03-proof-loop.mp4` | Pass — connected reel, narration, checks, and delivery loop |

End-frame SSIM against the approved stills, after a common crop/scale, measured 0.796, 0.825, and 0.754 respectively. The frames retain the approved composition and palette while allowing minor generated paper motion and texture changes.

## Assembly result

- Higgsfield server assembly job: `e9c7b74f-66c5-4ccf-bab4-284519ae0bcd`
- QA result: rejected for the public cut. The workflow enforces fixed ten-second blocks, so three five-second clips became a 29.99-second master and the source motion was slowed.
- Approved public cut: `assets/vox-collage-higgsfield-demo.mp4`
- Local assembly: exact five-second trims, hard story cuts at five and ten seconds, 480 × 854 output, 24 fps, no source-video stretching.
- Audio: upbeat ElevenLabs voice plus Music v2 score, sidechain ducked under narration.
- Final media QA: 15.00 seconds, H.264 High, AAC stereo 48 kHz, mean volume −17.4 dB, peak −1.0 dB, no detected silence longer than 0.3s at −48 dB, and 360/360 frames above the low-content threshold.
