export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function mix(from, to, progress) {
  return from + (to - from) * progress;
}

export function smooth(progress) {
  const p = clamp(progress);
  return p * p * p * (p * (p * 6 - 15) + 10);
}

export function easeOut(progress) {
  const p = clamp(progress);
  return 1 - Math.pow(1 - p, 3);
}

export function range(value, start, end) {
  if (start === end) return value >= end ? 1 : 0;
  return smooth((value - start) / (end - start));
}

export function enterHoldExit(value, enterStart, enterEnd, exitStart, exitEnd) {
  return Math.min(range(value, enterStart, enterEnd), 1 - range(value, exitStart, exitEnd));
}

export function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const whole = Math.floor(safe);
  const frames = Math.floor((safe - whole) * 30);
  return `00:${String(whole).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}
