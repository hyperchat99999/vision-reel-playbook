import React from "react";
import { formatTime, mix, range } from "./motion.js";

export const launchFilmDuration = 12;

function LaunchScene({ active, enter = active, exit = 0, className = "", reducedMotion = false, children }) {
  const travel = reducedMotion ? 0 : mix(44, 0, enter) - exit * 36;
  const scale = reducedMotion ? 1 : mix(0.985, 1, enter) + exit * 0.012;
  return (
    <div
      className={`lf-scene ${className}`}
      style={{
        opacity: active,
        clipPath: `inset(${exit * 58}% ${mix(8, 0, enter)}% ${mix(8, 0, enter)}% 0)`,
        transform: `translate3d(0, ${travel}px, 0) scale(${scale})`
      }}
      aria-hidden={active < 0.02}
    >
      {children}
    </div>
  );
}

function sceneState(t, enterStart, enterEnd, exitStart, exitEnd) {
  const enter = range(t, enterStart, enterEnd);
  const exit = range(t, exitStart, exitEnd);
  return { enter, exit, active: Math.min(enter, 1 - exit) };
}

function InterfaceFragment({ className, label, progress, delay = 0 }) {
  const shown = range(progress, delay, delay + 0.2);
  const drift = range(progress, delay + 0.12, 1);
  return (
    <div className={`lf-fragment ${className}`} style={{ opacity: shown, transform: `translate3d(${mix(20, -8, drift)}px, ${mix(38, -10, shown)}px, 0) rotate(${mix(-1.5, 0.8, drift)}deg) scale(${mix(0.94, 1.02, shown)})` }}>
      <div className="lf-fragment-bar"><i /><i /><i /><span>{label}</span></div>
      <div className="lf-fragment-body"><b /><span /><span /><em style={{ transform: `scaleX(${shown})` }} /></div>
    </div>
  );
}

const kineticBeats = [
  { word: "BRIEF.", note: "Name the belief", start: 3.72 },
  { word: "DIRECT.", note: "Give it an actor", start: 4.46 },
  { word: "RENDER.", note: "Control every frame", start: 5.2 },
  { word: "PROVE.", note: "Inspect the evidence", start: 5.94 }
];

export function LaunchFilm({ t, reducedMotion = false }) {
  const hookExit = range(t, 1.72, 2.05);
  const hook = { enter: 1, exit: hookExit, active: 1 - hookExit };
  const question = sceneState(t, 1.84, 2.15, 3.55, 3.9);
  const kinetic = sceneState(t, 3.68, 3.98, 6.46, 6.82);
  const product = sceneState(t, 6.72, 7.08, 9.7, 10.06);
  const closeEnter = range(t, 9.78, 10.15);
  const close = { enter: closeEnter, exit: 0, active: closeEnter };
  const questionP = range(t, 1.6, 3.65);
  const productP = range(t, 6.62, 9.82);
  const closeP = range(t, 9.7, 11.55);
  const depth = reducedMotion ? 0 : 1;
  const routeP = range(t, 0.3, 11.35);
  const pointerLegOne = range(productP, 0.03, 0.31);
  const pointerLegTwo = range(productP, 0.38, 0.76);
  const pointerX = mix(mix(58, 86, pointerLegOne), 72, pointerLegTwo);
  const pointerY = mix(mix(74, 16, pointerLegOne), 70, pointerLegTwo);
  const clickP = range(productP, 0.28, 0.45);
  const toastP = range(productP, 0.48, 0.7);

  return (
    <section className="preset-film launch-film" aria-label="Editorial product launch film">
      <div className="lf-paper" />
      <div className="lf-light lf-light-a" style={{ transform: `translate3d(${mix(5, -7, routeP) * depth}vw, ${mix(-4, 6, routeP) * depth}vh, 0)` }} />
      <div className="lf-light lf-light-b" style={{ transform: `translate3d(${mix(-5, 8, routeP) * depth}vw, ${mix(5, -5, routeP) * depth}vh, 0)` }} />
      <div className="lf-motion-block" style={{ left: `${mix(5, 91, routeP)}%`, transform: `translateX(-50%) rotate(${mix(-8, 8, routeP)}deg) scale(${mix(0.8, 1.25, Math.sin(routeP * Math.PI) ** 2)})` }} aria-hidden="true" />
      <header className="lf-header">
        <div className="lf-brand"><i /> VISION REEL</div>
        <span>{formatTime(t)} / PRODUCT FILM</span>
      </header>

      <LaunchScene {...hook} reducedMotion={reducedMotion} className="lf-hook">
        <p>Product demos shouldn’t feel like</p>
        <h1>screen<br /><em style={{ clipPath: `inset(0 ${100 - range(t, 0.16, 0.9) * 100}% 0 0)` }}>recordings.</em></h1>
        <span>They should make the proof impossible to miss.</span>
        <div className="lf-hook-steps" aria-hidden="true"><b>01 / CLAIM</b><i style={{ transform: `scaleX(${range(t, 0.25, 0.95)})` }} /><b>02 / ACT</b><i style={{ transform: `scaleX(${range(t, 0.55, 1.25)})` }} /><b>03 / PROVE</b></div>
      </LaunchScene>

      <LaunchScene {...question} reducedMotion={reducedMotion} className="lf-question">
        <InterfaceFragment className="lf-fragment-a" label="SCRIPT" progress={questionP} delay={0.02} />
        <InterfaceFragment className="lf-fragment-b" label="TIMELINE" progress={questionP} delay={0.14} />
        <InterfaceFragment className="lf-fragment-c" label="EVIDENCE" progress={questionP} delay={0.27} />
        <InterfaceFragment className="lf-fragment-d" label="OUTPUT" progress={questionP} delay={0.4} />
        <h2>What if code<br />became the <em>camera?</em></h2>
        <div className="lf-question-orbit" style={{ transform: `rotate(${questionP * 155}deg) scale(${mix(0.7, 1.08, questionP)})` }}><i /></div>
      </LaunchScene>

      <LaunchScene {...kinetic} reducedMotion={reducedMotion} className="lf-kinetic">
        <div className="lf-kinetic-stack">
          {kineticBeats.map((beat, index) => {
            const enter = range(t, beat.start, beat.start + 0.28);
            const exit = range(t, beat.start + 0.58, beat.start + 0.88);
            const active = Math.min(enter, 1 - exit);
            return (
              <div className="lf-kinetic-beat" key={beat.word} style={{ opacity: active, transform: `translate3d(${mix(120, 0, enter) - exit * 150}px, ${mix(18, 0, enter)}px, 0) skewX(${mix(-5, 0, enter)}deg)` }}>
                <span>0{index + 1}</span>
                <strong>{beat.word}</strong>
                <em>{beat.note}</em>
              </div>
            );
          })}
        </div>
        <div className="lf-kinetic-meta"><span>01—04</span><strong>ONE SENTENCE / ONE VISUAL ACTOR</strong></div>
        <div className="lf-kinetic-rail"><i style={{ width: `${range(t, 3.6, 6.78) * 100}%` }} /></div>
      </LaunchScene>

      <LaunchScene {...product} reducedMotion={reducedMotion} className="lf-product">
        <div className="lf-product-copy">
          <p>Real interface.<br />Directed frame by frame.</p>
          <div><span>RENDER STATE</span><strong>{Math.round(productP * 289)} / 289</strong></div>
          <div className="lf-proof-list">
            {["Claim mapped", "Actor directed", "Frames checked"].map((label, index) => <span className={productP > 0.3 + index * 0.17 ? "active" : ""} key={label}><i />{label}</span>)}
          </div>
        </div>
        <div
          className="lf-browser"
          style={{ transform: `perspective(1600px) translate3d(${mix(110, -22, productP) * depth}px, ${mix(44, -14, productP) * depth}px, 0) rotateY(${mix(-7, 1.2, productP) * depth}deg) rotateX(${mix(2, -0.5, productP) * depth}deg) scale(${mix(0.9, 1.025, productP)})` }}
        >
          <div className="lf-browser-bar"><i /><i /><i /><span>vision-reel / render studio</span><b>● CAPTURING</b></div>
          <div className="lf-dashboard">
            <aside><strong>VR</strong><span className="active">Film</span><span>Script</span><span>Frames</span><span>Checks</span></aside>
            <main>
              <div className="lf-dashboard-head"><div><span>PROJECT 001</span><h3>Launch proof</h3></div><button className={clickP > 0.4 ? "active" : ""}>Render film</button></div>
              <div className="lf-dashboard-metrics">
                <div><span>DURATION</span><strong>00:12</strong><i style={{ width: `${45 + productP * 25}%` }} /></div>
                <div><span>FRAMES</span><strong>{Math.round(productP * 289)}</strong><i style={{ width: `${productP * 100}%` }} /></div>
                <div><span>QUALITY GATES</span><strong>{String(Math.min(8, Math.floor(productP * 9))).padStart(2, "0")}/08</strong><i style={{ width: `${productP * 100}%` }} /></div>
              </div>
              <div className="lf-timeline-card">
                <div><span>VISUAL TIMELINE</span><strong>{Math.round(productP * 100)}%</strong></div>
                <section>
                  {["HOOK", "QUESTION", "TYPE", "PRODUCT", "PROOF"].map((label, index) => (
                    <i className={productP > index * 0.18 ? "active" : ""} key={label}><b>{label}</b><span style={{ transform: `scaleY(${Math.max(0.15, Math.min(1, productP * 2 - index * 0.26))})` }} /></i>
                  ))}
                </section>
                <em style={{ left: `${8 + productP * 86}%` }} />
              </div>
            </main>
          </div>
          <div className="lf-scanline" style={{ top: `${mix(10, 94, productP)}%` }} />
          <div className="lf-render-toast" style={{ opacity: toastP, transform: `translateY(${mix(18, 0, toastP)}px)` }}><i>✓</i><div><span>QUALITY GATES</span><strong>All checks passing</strong></div></div>
          <div className="lf-click-ring" style={{ opacity: 1 - range(clickP, 0.45, 1), transform: `scale(${mix(0.25, 2.6, clickP)})` }} />
          <div className="lf-pointer" style={{ left: `${pointerX}%`, top: `${pointerY}%` }} />
        </div>
      </LaunchScene>

      <LaunchScene {...close} reducedMotion={reducedMotion} className="lf-close">
        <div className="lf-mark" style={{ transform: `rotate(${mix(-35, 0, closeP)}deg) scale(${mix(0.5, 1, closeP)})` }}><span /><i /></div>
        <p>Don’t record the product.</p>
        <h2 style={{ clipPath: `inset(0 ${100 - closeP * 100}% 0 0)` }}>Direct it.</h2>
        <div className="lf-command" style={{ transform: `translateY(${mix(22, 0, closeP)}px)` }}><span>$</span><strong style={{ clipPath: `inset(0 ${100 - range(closeP, 0.2, 0.82) * 100}% 0 0)` }}>npx create-vision-reel my-film</strong><i>↗</i></div>
        <small>OPEN SOURCE · BROWSER-CAPTURED · DETERMINISTIC</small>
      </LaunchScene>

      <footer className="lf-footer"><span>MAKE THE PRODUCT ACT.</span><i style={{ width: `${Math.min(100, (t / launchFilmDuration) * 100)}%` }} /></footer>
    </section>
  );
}
