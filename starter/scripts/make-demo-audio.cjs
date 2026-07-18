const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith("--")) continue;
    options[argument.slice(2)] = argv[index + 1];
    index += 1;
  }
  return options;
}

const options = parseArgs(process.argv.slice(2));
const preset = options.preset || "launch-film";
const durations = { "scroll-story": 18, "launch-film": 12, "vox-collage": 15, "handdraw-story": 20 };
const duration = durations[preset];

if (!duration) {
  console.error(`Unknown scored preset "${preset}". Choose: ${Object.keys(durations).join(", ")}.`);
  process.exit(1);
}

const output = path.resolve(options.out || `qc/${preset}-score.wav`);
const sampleRate = 48000;
const channels = 2;
const frameCount = Math.ceil(duration * sampleRate);
const mix = new Float64Array(frameCount * channels);

function envelope(local, length, attack = 0.04, release = 0.18) {
  return Math.min(1, local / attack, (length - local) / release);
}

function addTone({ frequency, start, length, amplitude, pan = 0, harmonic = 0.12, attack, release }) {
  const first = Math.max(0, Math.floor(start * sampleRate));
  const last = Math.min(frameCount, Math.ceil((start + length) * sampleRate));
  const left = Math.sqrt((1 - pan) / 2);
  const right = Math.sqrt((1 + pan) / 2);

  for (let frame = first; frame < last; frame += 1) {
    const local = frame / sampleRate - start;
    const phase = Math.PI * 2 * frequency * local;
    const shape = Math.max(0, envelope(local, length, attack, release));
    const sample = (Math.sin(phase) + Math.sin(phase * 2) * harmonic) * amplitude * shape;
    mix[frame * 2] += sample * left;
    mix[frame * 2 + 1] += sample * right;
  }
}

function addPulse(start, frequency = 58, amplitude = 0.22) {
  addTone({ frequency, start, length: 0.42, amplitude, harmonic: 0.34, attack: 0.005, release: 0.4 });
  addTone({ frequency: frequency * 2.01, start: start + 0.012, length: 0.16, amplitude: amplitude * 0.28, pan: 0.16, harmonic: 0, attack: 0.002, release: 0.15 });
}

function addChime(start, frequencies, amplitude = 0.075) {
  frequencies.forEach((frequency, index) => {
    addTone({
      frequency,
      start: start + index * 0.075,
      length: 1.7 - index * 0.08,
      amplitude: amplitude * (1 - index * 0.12),
      pan: index % 2 === 0 ? -0.34 : 0.34,
      harmonic: 0.22,
      attack: 0.006,
      release: 1.25
    });
  });
}

function addBed(frequencies, amplitude) {
  frequencies.forEach((frequency, index) => {
    addTone({
      frequency,
      start: 0,
      length: duration,
      amplitude: amplitude / frequencies.length,
      pan: (index / Math.max(1, frequencies.length - 1)) * 1.2 - 0.6,
      harmonic: 0.06,
      attack: 1.2,
      release: 1.8
    });
  });
}

function deterministicNoise(frame, salt = 0) {
  const value = Math.sin((frame + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

function addKick(start, amplitude = 0.34) {
  const length = 0.32;
  const first = Math.max(0, Math.floor(start * sampleRate));
  const last = Math.min(frameCount, Math.ceil((start + length) * sampleRate));
  for (let frame = first; frame < last; frame += 1) {
    const local = frame / sampleRate - start;
    const frequency = 48 + 94 * Math.exp(-local * 19);
    const shape = Math.exp(-local * 13) * Math.min(1, local / 0.003);
    const sample = Math.sin(Math.PI * 2 * frequency * local) * amplitude * shape;
    mix[frame * 2] += sample * 0.72;
    mix[frame * 2 + 1] += sample * 0.72;
  }
}

function addNoiseHit(start, length, amplitude, salt, pan = 0) {
  const first = Math.max(0, Math.floor(start * sampleRate));
  const last = Math.min(frameCount, Math.ceil((start + length) * sampleRate));
  const left = Math.sqrt((1 - pan) / 2);
  const right = Math.sqrt((1 + pan) / 2);
  for (let frame = first; frame < last; frame += 1) {
    const local = frame / sampleRate - start;
    const shape = Math.exp(-local * (length > 0.2 ? 12 : 34)) * Math.min(1, local / 0.002);
    const noise = deterministicNoise(frame, salt);
    const shimmer = noise - deterministicNoise(Math.max(0, frame - 2), salt);
    mix[frame * 2] += shimmer * amplitude * shape * left;
    mix[frame * 2 + 1] += shimmer * amplitude * shape * right;
  }
}

function addSnare(start, amplitude = 0.13) {
  addNoiseHit(start, 0.24, amplitude, 11, -0.08);
  addTone({ frequency: 186, start, length: 0.18, amplitude: amplitude * 0.48, pan: 0.08, harmonic: 0.4, attack: 0.002, release: 0.16 });
}

function addHat(start, amplitude = 0.035, pan = 0) {
  addNoiseHit(start, 0.065, amplitude, 23, pan);
}

function addTick(start, amplitude = 0.035, pan = 0) {
  addTone({ frequency: 1480, start, length: 0.045, amplitude, pan, harmonic: 0.38, attack: 0.001, release: 0.038 });
  addNoiseHit(start, 0.035, amplitude * 0.42, 67, pan);
}

function addPluck(start, frequency, amplitude = 0.045, pan = 0) {
  addTone({ frequency, start, length: 0.19, amplitude, pan, harmonic: 0.28, attack: 0.002, release: 0.17 });
  addTone({ frequency: frequency * 2.01, start: start + 0.006, length: 0.095, amplitude: amplitude * 0.27, pan: -pan, harmonic: 0.08, attack: 0.001, release: 0.085 });
}

function addBass(start, frequency, length = 0.4, amplitude = 0.105) {
  addTone({ frequency, start, length, amplitude, pan: 0, harmonic: 0.28, attack: 0.006, release: Math.min(0.22, length * 0.55) });
}

function addRiser(start, length = 0.55, amplitude = 0.045) {
  const first = Math.max(0, Math.floor(start * sampleRate));
  const last = Math.min(frameCount, Math.ceil((start + length) * sampleRate));
  for (let frame = first; frame < last; frame += 1) {
    const local = frame / sampleRate - start;
    const progress = Math.max(0, Math.min(1, local / length));
    const shape = Math.sin(Math.PI * progress) ** 0.7;
    const frequency = 180 + progress * 980;
    const tone = Math.sin(Math.PI * 2 * frequency * local) * 0.45;
    const noise = deterministicNoise(frame, 41) * 0.55;
    const sample = (tone + noise) * amplitude * shape;
    mix[frame * 2] += sample * Math.sqrt((1 - (progress * 1.4 - 0.7)) / 2);
    mix[frame * 2 + 1] += sample * Math.sqrt((1 + (progress * 1.4 - 0.7)) / 2);
  }
}

function addRhythm({ bpm, bassNotes, chapterTimes = [], intensity = 1 }) {
  const beat = 60 / bpm;
  const eighth = beat / 2;
  for (let time = 0; time < duration; time += eighth) {
    const eighthIndex = Math.round(time / eighth);
    const beatIndex = Math.floor(eighthIndex / 2);
    addHat(time, (eighthIndex % 2 === 0 ? 0.036 : 0.025) * intensity, eighthIndex % 4 < 2 ? -0.24 : 0.24);
    if (eighthIndex % 2 === 1) addTick(time, 0.024 * intensity, eighthIndex % 4 === 1 ? -0.32 : 0.32);
    if (eighthIndex % 2 === 0) {
      addKick(time, (beatIndex % 4 === 0 ? 0.35 : 0.27) * intensity);
      if (beatIndex % 4 === 1 || beatIndex % 4 === 3) addSnare(time, 0.12 * intensity);
      addBass(time, bassNotes[beatIndex % bassNotes.length], beat * 0.82, 0.09 * intensity);
    }
  }
  chapterTimes.forEach((time, index) => {
    addRiser(Math.max(0, time - 0.52), 0.5, 0.05 * intensity);
    addPulse(time, index === chapterTimes.length - 1 ? 73.42 : 58, 0.25 * intensity);
    addChime(time + 0.02, index === chapterTimes.length - 1 ? [293.66, 369.99, 440, 587.33] : [293.66, 440], 0.045 * intensity);
  });
}

if (preset === "scroll-story") {
  addBed([73.42, 110, 146.83, 220], 0.038);
  addRhythm({ bpm: 128, bassNotes: [55, 55, 65.41, 73.42, 55, 82.41, 73.42, 65.41], chapterTimes: [2.95, 6.65, 10.95, 14.2], intensity: 1.06 });
  for (let time = 0.234, step = 0; time < duration - 0.3; time += 0.46875, step += 1) {
    const notes = [293.66, 369.99, 440, 587.33];
    addPluck(time, notes[step % notes.length], 0.035, step % 2 === 0 ? -0.38 : 0.38);
  }
} else if (preset === "launch-film") {
  addBed([110, 146.83, 220, 293.66], 0.03);
  addRhythm({ bpm: 132, bassNotes: [55, 73.42, 82.41, 73.42, 55, 65.41, 73.42, 82.41], chapterTimes: [2, 4, 7, 10], intensity: 1.08 });
  [0, 2, 4, 7, 10].forEach((time, index) => addPulse(time, index === 4 ? 73.42 : 62, 0.23));
  for (let time = 0.227, step = 0; time < duration - 0.2; time += 0.4545, step += 1) addPluck(time, [293.66, 369.99, 440, 587.33][step % 4], 0.03, step % 2 ? 0.36 : -0.36);
  addChime(10.12, [293.66, 369.99, 440, 587.33], 0.085);
} else if (preset === "handdraw-story") {
  addBed([65.41, 98, 130.81, 196], 0.032);
  addRhythm({ bpm: 118, bassNotes: [65.41, 73.42, 82.41, 73.42, 65.41, 82.41, 98, 82.41], chapterTimes: [4, 8, 12, 16, 19.25], intensity: 0.98 });
  for (let time = 0.254, step = 0; time < duration - 0.25; time += 0.5085, step += 1) {
    const notes = [261.63, 329.63, 392, 493.88];
    addPluck(time, notes[step % notes.length], 0.032, step % 2 === 0 ? -0.3 : 0.3);
  }
} else {
  addBed([65.41, 98, 130.81, 196], 0.034);
  addRhythm({ bpm: 126, bassNotes: [55, 65.41, 73.42, 65.41, 55, 73.42, 82.41, 73.42], chapterTimes: [5, 10, 14.15], intensity: 1.02 });
  for (let time = 0.238, step = 0; time < duration - 0.2; time += 0.4762, step += 1) {
    const notes = [261.63, 329.63, 392, 523.25];
    addPluck(time, notes[step % notes.length], 0.033, step % 2 === 0 ? -0.42 : 0.42);
  }
}

let sumSquares = 0;
let nonFiniteSamples = 0;
let firstNonFiniteSample = -1;
for (let index = 0; index < mix.length; index += 1) {
  if (!Number.isFinite(mix[index])) {
    nonFiniteSamples += 1;
    if (firstNonFiniteSample < 0) firstNonFiniteSample = index;
    mix[index] = 0;
  }
  sumSquares += mix[index] * mix[index];
}
if (nonFiniteSamples > 0) {
  throw new Error(`Generated ${nonFiniteSamples} non-finite sample(s), first at ${(firstNonFiniteSample / channels / sampleRate).toFixed(4)}s.`);
}
const rms = Math.sqrt(sumSquares / Math.max(1, mix.length));
const rmsGain = rms > 0 ? Math.min(3.2, 0.17 / rms) : 1;
const mastered = new Float64Array(mix.length);
let peak = 0;
for (let index = 0; index < mix.length; index += 1) {
  const sample = Math.tanh(mix[index] * rmsGain * 1.18) / Math.tanh(1.18);
  mastered[index] = sample;
  peak = Math.max(peak, Math.abs(sample));
}
const targetPeak = 0.88;
const gain = peak > 0 ? targetPeak / peak : 1;
const dataSize = frameCount * channels * 2;
const wav = Buffer.alloc(44 + dataSize);

wav.write("RIFF", 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write("WAVE", 8);
wav.write("fmt ", 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(channels, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * channels * 2, 28);
wav.writeUInt16LE(channels * 2, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(dataSize, 40);

for (let index = 0; index < mastered.length; index += 1) {
  const sample = Math.max(-1, Math.min(1, mastered[index] * gain));
  wav.writeInt16LE(Math.round(sample * 32767), 44 + index * 2);
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, wav);
console.log(`generated ${preset} score at ${output} (master gain ${gain.toFixed(2)}x, source RMS ${rms.toFixed(4)})`);
