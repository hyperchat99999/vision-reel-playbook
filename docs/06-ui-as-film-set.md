# UI As Film Set

The product interface should be driven by a timeline that sets every visual state for a given time.

## The Contract

Expose a browser-global function:

```js
window.__filmSetT = (t) => {
  // set every visual state for time t
};
window.__filmReady = true;
window.__filmDuration = 42;
```

The renderer calls `__filmSetT(t)` for each frame, waits for paint, then screenshots the browser.

## Time-Driven State

Every visual state should be a pure function of time:

- Opacity.
- Position.
- Count-up values.
- Pointer position.
- Scroll offset.
- Highlight state.
- Typewriter text.
- Active persona or route.

Avoid timers, random values, and real wall-clock dates during render.

## Product Mode Versus Film Mode

The live product can remain interactive. Film mode should activate only in the video harness.

Common patterns:

- Context hook: `useFilmTime()` returns `{ t, beat }` only inside the film harness.
- Optional prop: `renderT` drives a page only when supplied.
- CSS class: `body.render` hides demo chrome and disables transitions.

The product should behave normally outside film mode.

In the code and render pipeline this same state is called **render mode** — it is switched on by the `?render=1` URL and the `body.render` class. *Film mode* and *render mode* mean the same thing: the app knows it is being filmed.

## Real App Setup

For each filmed scene:

- Route to the right page.
- Seed persona and selected object.
- Freeze dates.
- Set stable mock data.
- Hide dev-only controls.
- Use a fixed viewport.
- Scroll inner content, not the clip window.

## Measure, Do Not Eyeball

Pointer targets and scroll rests should come from the DOM:

- Use `getBoundingClientRect()`.
- Measure button centers.
- Measure row centers.
- Measure scroll offsets that put the acting region center-frame.

Re-measure after layout, scale, font, or copy changes.

## Common UI Acting Devices

- Pointer click.
- Row highlight.
- Status chip flip.
- Counter count-up.
- Agent status pulse.
- Chat stream with caret.
- Progress bar fill.
- Card ghost-in.
- Dimming non-acting panels.

Use these inside the product layer where possible.
