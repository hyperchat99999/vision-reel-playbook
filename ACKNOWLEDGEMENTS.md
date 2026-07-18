# Acknowledgements

The cinematic scroll preset was informed by Amir Mushich's MIT-licensed [cinematic-scroll-prompt-kit](https://github.com/amirmushichge/cinematic-scroll-prompt-kit), especially its use of normalized progress, explicit enter/hold/exit phases, and responsive visual QA.

No source code, branding, copy, or visual assets were copied into Vision Reel. The implementation, scene structures, UI, typography, palettes, and motion system in this repository are original.

The supplied local reference video was studied only for general motion grammar: hook, contrast, kinetic statement, product proof, and close. Its branding and assets are not included.

The VOX collage preset was informed by MegaTroll222's MIT-licensed [VOX-COLLAGE-BROLL](https://github.com/MegaTroll222/VOX-COLLAGE-BROLL), an English adaptation of [gbro-collage-broll](https://github.com/pyang5166/gbro-collage-broll) by pyang5166. Vision Reel carries forward the high-level craft principles of approval gates, one readable metaphor per beat, meaning-led color fields, constrained paper groups, assemble-from-empty motion, anti-lettering constraints for generated media, and frame-based QA. It does not copy the reference skill's code, prompts, branding, or example assets.

Vision Reel's collage implementation is an original, JSON-driven React composition designed for deterministic browser rendering. It replaces the reference workflow's single generated metaphor with reusable creator/problem/proof beats, deterministic typography, connected UI evidence, preview accessibility, and local fallback audio.

The optional hand-drawn treatment was informed by xiejunjie524's MIT-licensed [handdraw-story-video](https://github.com/xiejunjie524/handdraw-story-video), especially its use of one color master per scene, a locally derived aligned line layer, directional line-and-color reveals, sparse staging, and scene validation. Vision Reel's implementation combines an original React composition, five original generated editorial illustrations, an original creator-proof storyline, and a new score plan. No upstream code, prompts, example artwork, or generated assets are included.

Two AI-generated concept frames were used as private art-direction references during development. They are documented in [`design-references/README.md`](design-references/README.md) and are not loaded by the runtime or renderer.

The four public deterministic showcase MP4s contain sections of an original video-aware suite generated with ElevenLabs Music v2. Generated projects do not call ElevenLabs: their default scores are created locally and deterministically, and users may supply their own licensed audio with `--audio`.
