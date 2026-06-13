# Make Your First Product Film

This is the fastest path through the repo. It turns the starter into a tiny product film.

Target output: a 20 to 30 second clean MP4 showing a fictional product UI acting out a short narration.

## 0. Prerequisites

You need **Node.js 20 or newer** — that is the only thing you install by hand. `npm run setup` then pulls in everything else (Puppeteer downloads its own browser; FFmpeg ships as the bundled `ffmpeg-static` dependency). The starter renders a real-UI film with no paid services. Generated voiceover or generated/hybrid footage is optional and may use paid external services.

Install Node.js:

- **macOS:** the LTS installer from https://nodejs.org, or `brew install node`.
- **Windows:** the LTS installer from https://nodejs.org (tick "Add to PATH"), or `winget install OpenJS.NodeJS.LTS`.
- **Linux:** your package manager, or https://nodejs.org.

Confirm it worked: open a terminal in this repo folder and run `node -v` (you should see `v20` or higher).

**Never used a terminal?** You don't have to run these commands yourself — ask a developer or development assistant to set up and render the sample. See [`AGENTS.md`](AGENTS.md).

> **Not sure what your film should be about?** Run the [Idea-to-Film discovery consultant](prompts/idea-to-film-consultant.md) first — paste it into your preferred chat assistant and it interviews you into the brief and beats below.

## 1. Start With One Business Question

Use this fictional question:

```text
Can a leader see a capability gap and understand the next action?
```

The film should answer that question, not tour every feature.

## 2. Write Three Beats

Use the starter beat shape:

| Beat | Purpose | Visual |
|---|---|---|
| 1 | Ask the question | Framework opener |
| 2 | Show the product proof | Real UI dashboard and workflow |
| 3 | Close the loop | Outcome card |

## 3. Draft Short Voiceover

Use this as a placeholder:

```text
Leaders do not need another activity report. They need to know where readiness is at risk.
The product surfaces the active gap, builds Jordan's next actions, and explains why each step belongs in the plan.
Now the outcome is visible: the business question, the personal evidence, the plan, and the record all stay connected.
```

## 4. Map Sentences To Actors

| Sentence | Actor | Action |
|---|---|---|
| Leaders need to know where readiness is at risk. | Dashboard cards | Cards appear and one gap gets a hot ring |
| The product surfaces the active gap. | Gap card | Customer discovery card becomes active |
| Builds Jordan's next actions. | Plan rows | Rows stage in by month |
| Explains why each step belongs. | Explanation panel | Panel opens and streams the reason |
| Outcome is visible. | Closing card | Readiness count lands |

This is the core habit: no sentence without a visual actor.

## 5. Run The Starter

From the repo root, install once (first time only), then start the app:

```bash
npm run setup
npm run dev
```

Open:

```text
http://localhost:5173/video.html?render=1
```

Use the browser console to scrub:

```js
window.__filmSetT(10)
```

## 6. Render A Sample

From the repo root:

```bash
npm run render:sample
```

This starts the starter app, captures frames, stitches the video, and shuts the local server down.

## 7. Check The Output

Run:

```bash
npm run scan:ip
npm run check:timing
npm run qc:blank
```

If you captured frames, create a contact sheet:

```bash
npm run qc:sheet
```

## 8. Improve One Beat Before Scaling

Before making a full film:

- Pick the most representative beat.
- Make timing, density, and visual hierarchy excellent.
- Confirm that every spoken phrase has one actor.
- Only then expand to the remaining beats.

That habit prevents mass-producing a weak standard.

## Troubleshooting

- **`node` or `npm` not recognized:** Node.js is not installed or not on your PATH. Reinstall from https://nodejs.org and reopen the terminal.
- **`Missing dependency "puppeteer"` or `"ffmpeg-static"`:** dependencies are not installed. Run `npm run setup` from the repo root.
- **`Starter app did not become ready`:** something else is using port 5173, or the dev server failed to start. Close other dev servers and re-run `npm run render:sample`.
- **The render finishes but the video has no sound:** that is expected — the sample is silent by default. Add a voiceover with the renderer's `--audio` option (see [`starter/render/README.md`](starter/render/README.md)).
- **Stuck?** Share the error with a developer or development assistant alongside [`AGENTS.md`](AGENTS.md), or open an issue.
