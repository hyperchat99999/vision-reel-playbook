import manifest from "./preset-manifest.json";

export const presetDefinitions = manifest;

export function resolvePreset(value) {
  return presetDefinitions[value] || presetDefinitions.classic;
}
