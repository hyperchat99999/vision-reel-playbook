# Vision Reel Playbook

[![CI](https://github.com/hyperchat99999/vision-reel-playbook/actions/workflows/ci.yml/badge.svg)](https://github.com/hyperchat99999/vision-reel-playbook/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/create-vision-reel.svg)](https://www.npmjs.com/package/create-vision-reel)
[![npm downloads](https://img.shields.io/npm/dm/create-vision-reel.svg)](https://www.npmjs.com/package/create-vision-reel)
[![GitHub release](https://img.shields.io/github/v/release/hyperchat99999/vision-reel-playbook)](https://github.com/hyperchat99999/vision-reel-playbook/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node 20+](https://img.shields.io/badge/Node-20%2B-0b1f33)](starter/README.md)
[![Public safe](https://img.shields.io/badge/Public--safe-IP%20scan-1d4fd8)](docs/09-ip-safety.md)
[![Starter included](https://img.shields.io/badge/Starter-included-0f9f83)](starter/README.md)
[![Live showcase](https://img.shields.io/badge/Live-showcase-c9ff5d)](https://vision-reel-playbook-oss.sudiv-gulla-1110.chatgpt.site)

**Vision Reel Playbook turns a real product, workflow, strategy, or prototype into the right kind of short film for the communication problem.** It pairs a repeatable discovery method with three signature formats and a working starter kit, so an idea that would normally live in a deck or screen recording becomes something people watch, follow, and remember.

You start with the audience's question, choose a **cinematic scroll story**, **editorial launch film**, or **VOX collage explainer**, then map each sentence to one visible actor. The browser captures every frame deterministically and checks the result for blank frames, broken timing, or leaked private data. The local path uses no paid generation service; voiceover and generated context remain optional production upgrades.

## Start With The Communication Problem

Do not choose a format because it looks fashionable. Choose the one that solves the viewer's actual problem:

| If the audience needs to… | Start with | Why it fits |
| --- | --- | --- |
| Follow a connected journey, workflow, or system | [`scroll-story`](assets/scroll-story-demo.mp4) | Portrait depth and chapter continuity make sequence itself become the proof. |
| Care that a product, feature, or project now exists | [`launch-film`](assets/launch-film-demo.mp4) | Landscape kinetic type creates announcement energy, then one product beat earns the claim. |
| Understand an abstract problem, mechanism, or concept | [`vox-collage`](assets/vox-collage-demo.mp4) | Concrete paper actors and assembled evidence turn explanation into a visible before/after. |

**Not sure which job you have?** Run the [Idea-to-Film discovery consultant](prompts/idea-to-film-consultant.md). It interviews you in plain language, recommends one of the three formats with a reason and alternate, then produces the brief, beat sheet, evidence treatment, and word-anchor plan. No coding needed.

> **Legacy starter proof.** The backward-compatible `classic` sample below demonstrates the shared render contract end-to-end: real UI, word-synced timing, browser-captured frames, and FFmpeg assembly. The three signature films are featured in [Signature Presets](#signature-presets).

![Sample film rendered by the Vision Reel starter kit](assets/sample.gif)

<sub>The GIF above is a silent preview. The [full clean cut (`assets/sample-clean.mp4`)](assets/sample-clean.mp4) plays with a sample voiceover from a generic voice-generation service. Audio is optional; films render fine silent. Regenerate the GIF with `npm run gif`.</sub>

## Quickstart for Non-Coders

You do not need to write code. Three steps:

1. **Diagnose the idea.** Open the [discovery consultant](prompts/idea-to-film-consultant.md). It recommends scroll, launch, or collage based on the audience's communication problem—not your technical knowledge.
2. **Hand off a buildable plan.** Give its brief, beat sheet, format recommendation, and word anchors to a developer or development assistant alongside [`AGENTS.md`](AGENTS.md).
3. **Review and share.** You get a clean format-native MP4 with built-in checks for blank frames, timing, and private-data leaks. Add voiceover or generated context only when it improves the explanation.

Want to drive it yourself? The [10-minute path](#try-in-10-minutes) and [`MAKE_YOUR_FIRST_FILM.md`](MAKE_YOUR_FIRST_FILM.md) walk through the commands.

## Create A Standalone Project

Create a clean project with the starter, render scripts, safety checks, and templates included. The generator is published as [`create-vision-reel`](https://www.npmjs.com/package/create-vision-reel). Pick the format recommended by the consultant:

```bash
npx create-vision-reel@latest my-film --type scroll-story
cd my-film
npm run render:scroll-story
```

Choose a signature preset when you create the project:

```bash
npx create-vision-reel@latest my-scroll-film --type scroll-story
npx create-vision-reel@latest my-launch-film --type launch-film
npx create-vision-reel@latest my-collage-film --type vox-collage
```

The original `classic` preset remains the default only for backward compatibility. New films should deliberately choose one of the three signature formats.

All finished public masters are also collected in [`videos/`](videos/) for convenient review and download. The existing `assets/` paths remain canonical so gallery and renderer links stay backward compatible.

## Signature Presets

| Cinematic Scroll Story | Editorial Launch Film | VOX Collage Explainer |
| --- | --- | --- |
| [![Portrait cinematic scroll-story still](assets/scroll-story-demo-still.png)](assets/scroll-story-demo.mp4) | [![Landscape editorial launch-film still](assets/launch-film-demo-still.png)](assets/launch-film-demo.mp4) | [![Portrait VOX collage explainer still](assets/vox-collage-demo-still.png)](assets/vox-collage-demo.mp4) |
| 18-second, 9:16, layered 2.5D depth and scroll choreography. | 12-second, 16:9, kinetic editorial type and product-proof cuts. | 15-second, 9:16, paper-collage problem/solution storytelling driven by JSON. |
| `npm run render:scroll-story` | `npm run render:launch-film` | `npm run render:vox-collage` |

All three signature presets are deterministic, configurable, keyboard-previewable, reduced-motion aware, and rendered frame-by-frame. The default video-generation route is fully local: code-native visuals, procedural music, browser frame capture, and FFmpeg encoding with no paid API. See [`docs/19-no-cost-video-generation.md`](docs/19-no-cost-video-generation.md) for the complete workflow, [`docs/17-signature-presets.md`](docs/17-signature-presets.md) for the shared preset contract, and [`docs/18-vox-collage-explainer.md`](docs/18-vox-collage-explainer.md) for the collage configuration and optional production pass.

### Optional VOX Studio Cut

[![VOX collage studio-cut still](assets/vox-collage-higgsfield-demo-still.png)](assets/vox-collage-higgsfield-demo.mp4)

The [15-second studio cut](assets/vox-collage-higgsfield-demo.mp4) shows how the same reusable story contract can be pushed further with approved tactile collage plates, connected 480p Seedance motion, an upbeat ElevenLabs narrator, and a fast three-part instrumental score. The generated pass is source-provenanced under [`design-references/vox-collage/`](design-references/vox-collage/); the shipped `vox-collage` preset remains the reproducible, paid-service-free implementation.

## The Promise

Most professional work is trapped in decks, demos, screenshots, or long explanations. Vision Reel Playbook gives you a repeatable workflow for making a sharper artifact:

- Write the voiceover first.
- Map every sentence to one visible screen actor.
- Make real UI or structured visuals demonstrate the idea.
- Use generated clips only where human context helps.
- Render deterministic frames you can reproduce exactly.
- Run QC so the final film has no blank screens, broken timing, or private-data leaks.

## How It Works

Two loops drive every film: a **creative loop** (question → script → beats → word anchors) and a **render loop** (app state → browser frames → stitch → QC). The finished voiceover's word-level timing is the clock everything else runs on.

```mermaid
flowchart LR
  A["Business Question"] --> B["Voiceover Script"]
  B --> C["Beat Sheet"]
  C --> D["Word-Level Timing"]
  D --> E["Timeline Anchors"]
  E --> F["Video Harness"]
  F --> G["Browser Frame Capture"]
  G --> H["FFmpeg Encode"]
  H --> I["Final MP4"]
  I --> J["QC Review"]
  J --> C
```

The harness is driven through a tiny **render contract** — `window.__filmSetT(t)`, `window.__filmReady`, `window.__filmDuration` — so any stack (React, Vue, Svelte, Canvas, or plain HTML) can be stepped frame-by-frame and inspected at any timestamp. The app-native and hybrid-trilogy variants are diagrammed in [`docs/11-architecture.md`](docs/11-architecture.md).

## Try In 10 Minutes

```bash
npm run setup
npm run check
npm run render:sample
```

The sample render creates:

- `assets/sample-clean.mp4`
- `assets/sample-still.png`
- `assets/sample-contact-sheet.jpg`

Render the signature films with:

```bash
npm run render:scroll-story
npm run render:launch-film
npm run render:vox-collage
```

![Rendered starter film still](assets/sample-still.png)

For the guided path, start with [`MAKE_YOUR_FIRST_FILM.md`](MAKE_YOUR_FIRST_FILM.md).

## What You Can Make

- Product explainers where the real interface acts out the narration.
- Founder or strategy films that make an abstract idea tangible.
- Guided-workflow demos grounded in real product evidence.
- Hybrid films with generated human context plus real UI proof.
- Portrait scroll stories with cinematic depth and chapter-based reveals.
- Editorial launch films with kinetic typography and a clear product proof beat.
- Paper-collage explainers that turn a creator, product, process, or concept problem into a visible proof loop.
- Board, sales, launch, or internal vision videos that feel polished and specific.

## What Makes This Different

Many tools can create videos from code, screenshots, or prompts. This repo focuses on the production method:

- The work itself is the hero of the film.
- The product or idea proves each claim on screen.
- The final voiceover controls scene timing.
- Word-level anchors drive UI reveals, clicks, counters, scrolls, and streams.
- Quality control is artifact-based: contact sheets, frame grabs, blank-frame checks, link checks, and IP scans.
- Everything public-facing is fictional and safe to share.

## How This Compares

The browser → frames → FFmpeg plumbing here is deliberately boring and swappable. What the repo adds is an opinionated **method and quality bar** for one specific kind of film. Here is where it fits, and where another tool may serve you better:

| If you want… | Reach for | What this playbook adds |
| --- | --- | --- |
| A programmatic video engine (build the video in code) | [Remotion](https://www.remotion.dev/), [Motion Canvas](https://motioncanvas.io/), [Revideo](https://re.video/) | A method that drives your **real app** as the film set, plus editorial rules, timing discipline, and QC on top of the renderer. |
| A clickable product tour or quick screen recording | [Arcade](https://www.arcade.software/), [Supademo](https://supademo.com/), [Storylane](https://www.storylane.io/), [Screen Studio](https://www.screen.studio/) | A scripted, **voiceover-timed cinematic film** where every sentence gets one visual actor. |
| High-volume faceless / AI social clips | tools from lists like [awesome-faceless](https://github.com/sasharun/awesome-faceless) | A premium, on-brand format where the **real work is the hero**. |
| Only the browser-to-video plumbing | [timecut](https://github.com/tungs/timecut), [puppeteer-capture](https://github.com/alexey-pelykh/puppeteer-capture) | The same mechanism wrapped in an end-to-end method: word anchors, visual-completeness rules, blank-frame and timing QC, and an IP-safety gate. |

**Use those instead if** you need an interactive demo, a one-off capture, or high-volume generic content. **Use this if** you want a repeatable standard for polished, specific films where a real product or idea proves each claim on screen.

## Showcase

- [`SHOWCASE.md`](SHOWCASE.md) has fictional use cases.
- [`assets/sample-clean.mp4`](assets/sample-clean.mp4) is the rendered starter demo.
- [`assets/sample-contact-sheet.jpg`](assets/sample-contact-sheet.jpg) is the visual QC sheet.
- [`examples/worked-example/`](examples/worked-example/) shows a complete fictional mini-production.

Made something with the playbook? Use the [showcase submission form](https://github.com/hyperchat99999/vision-reel-playbook/issues/new?template=showcase_submission.yml) to share a public-safe result.

## Community And Maintenance

- Read the [roadmap](ROADMAP.md) and [open issues](https://github.com/hyperchat99999/vision-reel-playbook/issues) before proposing work.
- Use [GitHub Discussions](https://github.com/hyperchat99999/vision-reel-playbook/discussions) for questions and production ideas.
- Follow [CONTRIBUTING.md](CONTRIBUTING.md) for local checks and public-safety rules.
- See [SUPPORT.md](SUPPORT.md) for help and [SECURITY.md](SECURITY.md) for sensitive reports.

## Repo Map

```text
docs/
  The playbook: thinking, story, aesthetics, generation, rendering, QC, and IP safety.

starter/
  A fictional React/Vite app, video harness, render scripts, and QC scripts.

templates/
  Fill-in templates for briefs, beat sheets, shot lists, word anchors, prompts, and release checks.

examples/
  Worked examples and before/after fixes.

prompts/
  The Idea-to-Film discovery consultant: diagnoses the communication job, recommends one of three formats, and creates a buildable plan.

gallery/
  Public-safe showcase cards and metadata.

design-references/
  Generated art-direction references and their provenance notes; not runtime assets.

site/
  Lightweight static landing page retained for GitHub Pages compatibility.

website/
  The production Sites showcase with playable masters and the no-cost workflow.
```

## Build Your Own Film

1. Read [`MAKE_YOUR_FIRST_FILM.md`](MAKE_YOUR_FIRST_FILM.md).
2. Skim [`docs/11-architecture.md`](docs/11-architecture.md).
3. Fill in [`templates/creative-brief.md`](templates/creative-brief.md).
4. Draft narration in [`templates/beat-sheet.csv`](templates/beat-sheet.csv).
5. Map sentences to visual actors in [`templates/word-anchor-map.csv`](templates/word-anchor-map.csv).
6. Adapt the starter app in [`starter/app`](starter/app).
7. Render frames, inspect the contact sheet, then render the final MP4.

## Starter App

The starter app includes:

- A fictional dashboard.
- A learner/workflow screen.
- Three signature presets—cinematic scroll story, editorial launch film, and VOX collage explainer—plus the backward-compatible classic demo.
- A `video.html` entry that exposes `window.__filmSetT(t)`.
- Deterministic enter, hold, and exit choreography for every signature scene.
- A renderer that starts the app, captures browser frames, and stitches a sample video.

Run the full sample from the repo root:

```bash
npm run setup
npm run render:sample
npm run qc:blank
```

To inspect the starter manually:

```bash
npm run dev
```

Open:

```text
http://localhost:5173/video.html?render=1
http://localhost:5173/video.html?preset=scroll-story
http://localhost:5173/video.html?preset=launch-film
```

## IP Safety

Before publishing your own film or fork, run:

```bash
npm run check
```

The short version:

- Do not include real client names, logos, people, screenshots, prompts, transcripts, or voice files.
- Do not paste API keys.
- Do not ship generated assets unless you know their license and provenance.
- Scan the repo for brand strings and internal terms.
- Prefer fictional sample data and neutral examples.

## License

MIT. See [`LICENSE`](LICENSE).

See [`ACKNOWLEDGEMENTS.md`](ACKNOWLEDGEMENTS.md) for design-research attribution.
