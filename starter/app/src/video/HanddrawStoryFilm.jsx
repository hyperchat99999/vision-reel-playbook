import React from "react";
import storyConfig from "./handdraw-story-config.json";
import { clamp, mix, range } from "./motion.js";

function DrawnScene({ index, scene, localT, reducedMotion }) {
  const lineProgress = reducedMotion ? 1 : range(localT, .05, 1.18);
  const colorProgress = reducedMotion ? 1 : range(localT, .92, 2.18);
  const enter = reducedMotion ? 1 : range(localT, 0, .3);
  const exit = reducedMotion ? 1 : 1 - range(localT, 3.68, 4);
  const caption = reducedMotion ? 1 : range(localT, 1.34, 1.94);
  const cameraProgress = reducedMotion ? .5 : clamp(localT / 4);
  const sceneNumber = String(index + 1).padStart(2, "0");
  const lineClip = `inset(0 ${100 - lineProgress * 100}% 0 0)`;
  const colorClip = `inset(0 ${100 - colorProgress * 100}% 0 0)`;
  const cameraX = index % 2 === 0 ? mix(-.8, .8, cameraProgress) : mix(.8, -.8, cameraProgress);
  const cameraY = mix(.6, -.6, cameraProgress);
  const cameraScale = mix(1.025, 1.065, cameraProgress);
  const assetBase = `/handdraw-story/scene-${sceneNumber}`;

  return (
    <section className="hd-scene" style={{ "--hd-accent": scene.accent, "--hd-wash": scene.wash, opacity: enter * exit }}>
      <div className="hd-image-stage">
        <div className="hd-image-camera" style={{ transform: `translate(${cameraX}%, ${cameraY}%) scale(${cameraScale})` }}>
          <img alt="" className="hd-story-image hd-image-line" src={`${assetBase}-line.webp`} style={{ clipPath: lineClip }} />
          <img alt="" className="hd-story-image hd-image-color" src={`${assetBase}-runtime.webp`} style={{ clipPath: colorClip }} />
        </div>
        <div className="hd-image-vignette" />
        {!reducedMotion && colorProgress > .01 && colorProgress < .99 && (
          <i className="hd-reveal-brush" style={{ left: `${colorProgress * 100}%` }} />
        )}
      </div>
      <div className="hd-chapter">{scene.chapter}</div>
      <div className="hd-caption" style={{ opacity: caption, transform: `translateY(${mix(20, 0, caption)}px)` }}>
        <span>{sceneNumber}</span>
        <p>{scene.caption}</p>
      </div>
    </section>
  );
}

export function HanddrawStoryFilm({ reducedMotion, t }) {
  const sceneIndex = Math.min(storyConfig.scenes.length - 1, Math.floor(clamp(t, 0, 19.999) / 4));
  const scene = storyConfig.scenes[sceneIndex];
  const localT = t - scene.start;
  return (
    <div className="preset-film handdraw-story-film">
      <div className="hd-paper-noise" />
      <div className="hd-thread"><i style={{ height: `${clamp(t / 20) * 100}%` }} /></div>
      <DrawnScene index={sceneIndex} localT={localT} reducedMotion={reducedMotion} scene={scene} />
      <footer className="hd-footer"><span>Vision Reel / hand-drawn treatment</span><strong>{sceneIndex + 1} / {storyConfig.scenes.length}</strong></footer>
    </div>
  );
}
