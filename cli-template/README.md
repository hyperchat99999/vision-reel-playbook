# My Vision Reel

This is a standalone Vision Reel project generated from the public Vision Reel Playbook.

## Start

```bash
npm run setup
npm run check
npm run render:sample
```

The sample render creates `assets/sample-clean.mp4`, `assets/sample-still.png`, and `assets/sample-contact-sheet.jpg`.

This project also includes three signature presets:

```bash
npm run render:scroll-story
npm run render:launch-film
npm run render:vox-collage
```

Preview any format with `npm run dev`, then open `video.html?preset=classic`, `video.html?preset=scroll-story`, `video.html?preset=launch-film`, or `video.html?preset=vox-collage`.

The signature render commands are fully local and have no per-render generation cost. React and CSS generate the visuals, the browser captures deterministic frames, the included script synthesizes original music, and FFmpeg encodes the final MP4. Higgsfield, ElevenLabs, image models, and paid APIs are optional rather than required.

The project default lives in `starter/app/src/video/default-preset.json`. Customize the classic timeline in `timeline.js`, signature scenes in `ScrollStoryFilm.jsx` and `LaunchFilm.jsx`, collage beats in `vox-collage-config.json`, shared motion in `motion.js`, and visual tokens in `presets.css`.

Keep every public example fictional. Do not add private names, screenshots, prompts, recordings, credentials, or client data.

Upstream project: https://github.com/hyperchat99999/vision-reel-playbook
