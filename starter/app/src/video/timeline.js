export const timeline = [
  { id: "intro", title: "Question", t0: 0, t1: 6 },
  { id: "ui", title: "Product Proof", t0: 6, t1: 18 },
  { id: "close", title: "Outcome", t0: 18, t1: 24 }
];

export const duration = timeline[timeline.length - 1].t1;

export function sceneAt(t) {
  return timeline.find((scene) => t >= scene.t0 && t < scene.t1) || timeline[timeline.length - 1];
}

export function localTime(scene, t) {
  return Math.max(0, t - scene.t0);
}

