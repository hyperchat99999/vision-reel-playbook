# VOX collage narration QA

## Selected voice

- Provider: ElevenLabs
- Voice: Vision Reel Spark
- Voice ID: `oJ5DTZfN3Qe64fm8Drat`
- Voice source: ElevenLabs voice design; upbeat creator-tech direction selected from three previews
- Model: `eleven_v3`
- Language: English
- Speed: `1.08`
- Stability: `0.48`
- Similarity boost: `0.78`
- Style: `0.52`
- Speaker boost: enabled
- Source format: mono MP3, 44.1 kHz, 128 kb/s

## Approved takes

| Beat | Narration | Local source | Measured duration | Start time |
| --- | --- | --- | ---: | --- |
| Creator problem | Creators waste hours finding footage that actually proves each claim. | `upbeat-takes/tts_Creat_20260718_130056.mp3` | 3.79s | 0.45s |
| Meaning lock | Vision Reel pairs each claim with proof, then locks both to time. | `upbeat-takes/tts_Visio_20260718_130100.mp3` | 3.40s | 5.55s |
| Proof loop | The result is relevant visuals, clean pacing, and a quality-checked export. | `upbeat-takes/tts_The_r_20260718_130103.mp3` | 4.44s | 10.25s |

The calm Irina take and the first long-script take remain as rejected audit artifacts. They were not used because their tone and 6.09–7.52-second line lengths weakened the five-second pace.

## Selected score

- Provider/model: ElevenLabs Music v2
- File: `music/music__20260718_130325.mp3`
- Duration: 15.02s
- Direction: 128 BPM creator-tech percussion, marimba/plucked-synth accents, open narration midrange, lifts at five and ten seconds, final hit at the end
- QA: no silence longer than 0.15s at −48 dB; no vocals or spoken words

The final 15-second mix uses beat-level narration placement, narration-triggered music ducking, final peak limiting, and integrated loudness normalization. The rejected server-side explainer assembly remains in the QA folder because its fixed ten-second blocks expanded the three five-second clips to 30 seconds.
