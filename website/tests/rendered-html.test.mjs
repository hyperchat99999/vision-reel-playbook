import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Vision Reel showcase", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Vision Reel Playbook — Direct the product<\/title>/i);
  assert.match(html, /Don(?:&apos;|&#x27;|')t record/);
  assert.match(html, /Cinematic scroll story/);
  assert.match(html, /Editorial launch film/);
  assert.match(html, /VOX collage explainer/);
  assert.match(html, /The no-cost route/);
  assert.match(html, /npx create-vision-reel@latest my-film/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps all public film assets and production metadata", async () => {
  const assets = [
    "launch-film-demo.mp4",
    "scroll-story-demo.mp4",
    "vox-collage-demo.mp4",
    "vox-collage-higgsfield-demo.mp4",
    "sample-clean.mp4",
  ];
  await Promise.all(assets.map((asset) => access(new URL(`../public/media/${asset}`, import.meta.url))));

  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /controls playsInline/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(layout, /openGraph/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
