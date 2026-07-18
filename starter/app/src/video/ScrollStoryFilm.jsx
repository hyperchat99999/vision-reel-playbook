import React from "react";
import { clamp, formatTime, mix, range } from "./motion.js";

export const scrollStoryDuration = 18;

const beats = [
  { number: "01", label: "Write the proof" },
  { number: "02", label: "Choreograph states" },
  { number: "03", label: "Capture every frame" },
  { number: "04", label: "Inspect the evidence" }
];

function Scene({ active, enter = active, exit = 0, className = "", reducedMotion = false, children }) {
  const travel = reducedMotion ? 0 : mix(54, 0, enter) - exit * 44;
  const scale = reducedMotion ? 1 : mix(0.975, 1, enter) + exit * 0.018;
  return (
    <div
      className={`ss-scene ${className}`}
      style={{
        opacity: Math.pow(active, 1.25),
        clipPath: `inset(${exit * 92}% 0 ${mix(18, 0, enter)}% 0 round 12px)`,
        transform: `translate3d(0, ${travel}px, 0) scale(${scale})`
      }}
      aria-hidden={active < 0.02}
    >
      {children}
    </div>
  );
}

function ProofCard({ className, eyebrow, title, detail, active, depth = 1 }) {
  return (
    <div
      className={`ss-proof-card ${className}`}
      style={{
        opacity: 0.16 + active * 0.84,
        transform: `translate3d(0, ${mix(44 * depth, -16 * depth, active)}px, 0) rotate(${mix(-3, 0.5, active)}deg) scale(${mix(0.94, 1, active)})`
      }}
    >
      <span>{eyebrow}</span>
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
  );
}

function sceneState(p, enterStart, enterEnd, exitStart, exitEnd) {
  const enter = range(p, enterStart, enterEnd);
  const exit = range(p, exitStart, exitEnd);
  return { enter, exit, active: Math.min(enter, 1 - exit) };
}

function impactAt(time, center, radius = 0.34) {
  const distance = Math.abs(time - center) / radius;
  return distance >= 1 ? 0 : Math.sin((1 - distance) * Math.PI * 0.5) ** 2;
}

export function ScrollStoryFilm({ t, reducedMotion = false }) {
  const p = clamp(t / scrollStoryDuration);
  const introExit = range(p, 0.15, 0.18);
  const intro = { enter: 1, exit: introExit, active: 1 - introExit };
  const brief = sceneState(p, 0.16, 0.2, 0.36, 0.385);
  const stage = sceneState(p, 0.365, 0.405, 0.565, 0.59);
  const capture = sceneState(p, 0.57, 0.61, 0.775, 0.8);
  const closeEnter = range(p, 0.78, 0.82);
  const close = { enter: closeEnter, exit: 0, active: closeEnter };
  const depth = reducedMotion ? 0 : 1;
  const camera = range(p, 0.03, 0.94);
  const briefP = range(p, 0.17, 0.39);
  const stageP = range(p, 0.385, 0.6);
  const captureP = range(p, 0.595, 0.8);
  const closeP = range(p, 0.79, 0.96);
  const frameCount = Math.round(captureP * 432);
  const signalX = 91 + Math.sin(p * Math.PI * 4) * 1.5;
  const signalY = 82 - p * 68;
  const beatIndex = Math.min(3, Math.floor(p * 4.05));
  const cutImpact = reducedMotion
    ? 0
    : Math.max(impactAt(t, 2.95), impactAt(t, 6.65), impactAt(t, 10.95), impactAt(t, 14.2));
  const beatPhase = (t * 2) % 1;
  const musicPulse = reducedMotion ? 0 : Math.exp(-beatPhase * 7);
  const energyStep = Math.floor(t * 2) % 8;

  return (
    <section className="preset-film scroll-story-film" aria-label="Cinematic scroll story">
      <div className="ss-ambient ss-ambient-one" style={{ transform: `translate3d(${mix(-4, 8, p) * depth}vw, ${mix(-2, 7, p) * depth}vh, 0)` }} />
      <div className="ss-ambient ss-ambient-two" style={{ transform: `translate3d(${mix(5, -7, p) * depth}vw, ${mix(5, -6, p) * depth}vh, 0)` }} />
      <div className="ss-cut-flash" style={{ opacity: cutImpact * 0.34 }} />
      <div className="ss-speed-field" style={{ opacity: 0.12 + musicPulse * 0.12 + cutImpact * 0.2 }} aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <i key={index} style={{ transform: `translate3d(${mix(-18, 22, (p * (1.2 + index * 0.06)) % 1)}vw, ${index * 11 - 8}vh, 0) rotate(-13deg)` }} />
        ))}
      </div>
      <div className="ss-grain" />
      <div className="ss-shell">
        <header className="ss-header">
          <div className="ss-wordmark"><i /> VISION / REEL</div>
          <div className="ss-timecode">SCROLL FILM &nbsp; {formatTime(t)}</div>
        </header>

        <div className="ss-progress" aria-hidden="true">
          <span style={{ height: `${p * 100}%` }} />
          {beats.map((beat, index) => (
            <div className={p >= index * 0.22 + 0.1 ? "is-passed" : ""} key={beat.number}>
              <b>{beat.number}</b>
              <em>{beat.label}</em>
            </div>
          ))}
        </div>

        <div
          className="ss-world"
          style={{
            transform: `perspective(1500px) translate3d(${cutImpact * -8 * depth}px, ${mix(22, -42, camera) * depth - cutImpact * 9}px, 0) rotateX(${mix(1.6, -1, camera) * depth}deg) rotateZ(${mix(-0.35, 0.3, camera) * depth + cutImpact * 0.28}deg) scale(${mix(0.955, 1.045, camera) + cutImpact * 0.012})`
          }}
        >
          <div className="ss-orbit ss-orbit-a" style={{ transform: `translate3d(${mix(-20, 28, p) * depth}px, ${mix(70, -120, p) * depth}px, 0)` }}>SCRIPT</div>
          <div className="ss-orbit ss-orbit-b" style={{ transform: `translate3d(${mix(20, -36, p) * depth}px, ${mix(-50, 90, p) * depth}px, 0)` }}>STATE</div>

          <ProofCard className="ss-card-left" eyebrow="Creative brief" title="One claim." detail="One visible proof point." active={Math.max(brief.active, close.active)} depth={depth} />
          <ProofCard className="ss-card-right" eyebrow="Render contract" title="Pure time." detail="Every frame reproducible." active={Math.max(stage.active, close.active)} depth={depth} />

          <div className="ss-camera-frame">
            <div className="ss-energy-rail" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => <i className={index <= energyStep ? "active" : ""} key={index} />)}
            </div>
            <div className="ss-momentum-ticker" aria-hidden="true" style={{ transform: `translateX(${mix(8, -42, p)}%)` }}>
              CLAIM&nbsp;&nbsp;→&nbsp;&nbsp;VISIBLE STATE&nbsp;&nbsp;→&nbsp;&nbsp;PROOF&nbsp;&nbsp;→&nbsp;&nbsp;FRAME CHECK&nbsp;&nbsp;→&nbsp;&nbsp;TRUST
            </div>
            <svg className="ss-signal-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 92 84 C 86 72, 96 61, 90 49 S 96 28, 91 13" pathLength="100" />
              <path className="is-live" d="M 92 84 C 86 72, 96 61, 90 49 S 96 28, 91 13" pathLength="100" style={{ strokeDashoffset: 100 - p * 100 }} />
            </svg>
            <div className="ss-signal-token" style={{ left: `${signalX}%`, top: `${signalY}%`, transform: `translate(-50%, -50%) scale(${mix(0.78, 1.08, Math.sin(p * Math.PI) ** 2)})` }} aria-hidden="true">
              <span>{String(beatIndex + 1).padStart(2, "0")}</span><i />
            </div>

            <div className="ss-camera-topline">
              <span>FILM / 001</span>
              <div><i /> LIVE COMPOSITION</div>
            </div>

            <div className="ss-scene-stack">
              <Scene {...intro} reducedMotion={reducedMotion} className="ss-intro">
                <p className="ss-kicker">The product is already the set.</p>
                <h1>Make the<br /><em>proof</em> move.</h1>
                <p className="ss-deck">Turn real interface states into a film people can follow—and trust.</p>
                <div className="ss-intro-sequence" aria-hidden="true">
                  <span>CLAIM</span><i style={{ transform: `scaleX(${range(p, 0.03, 0.11)})` }} /><span>STATE</span><i style={{ transform: `scaleX(${range(p, 0.07, 0.15)})` }} /><span>PROOF</span>
                </div>
              </Scene>

              <Scene {...brief} reducedMotion={reducedMotion} className="ss-brief">
                <div className="ss-scene-number">01</div>
                <p className="ss-kicker">Start with the sentence</p>
                <h2>Write what the viewer must <em>believe.</em></h2>
                <div className="ss-script-line">
                  <span>VOICEOVER / CLAIM 01</span>
                  <strong style={{ clipPath: `inset(0 ${100 - briefP * 100}% 0 0)` }}>“Show the decision, then show the evidence.”</strong>
                  <i style={{ width: `${briefP * 100}%` }} />
                </div>
                <div className="ss-proof-map" aria-hidden="true">
                  <span className={briefP > 0.16 ? "active" : ""}>CLAIM</span>
                  <i style={{ transform: `scaleX(${range(briefP, 0.18, 0.42)})` }} />
                  <span className={briefP > 0.42 ? "active" : ""}>VISIBLE ACTION</span>
                  <i style={{ transform: `scaleX(${range(briefP, 0.45, 0.7)})` }} />
                  <span className={briefP > 0.7 ? "active" : ""}>TRUST</span>
                </div>
                <div className="ss-waveform" aria-hidden="true">
                  {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ height: `${18 + ((index * 19) % 38) * briefP}px`, opacity: 0.18 + briefP * 0.72 }} />)}
                </div>
              </Scene>

              <Scene {...stage} reducedMotion={reducedMotion} className="ss-stage-scene">
                <div className="ss-scene-number">02</div>
                <p className="ss-kicker">Direct the interface</p>
                <h2>Every word gets one <em>visual actor.</em></h2>
                <div className="ss-mini-ui">
                  <div className="ss-mini-nav"><b>VR</b><span /><span /><span /></div>
                  <div className="ss-mini-main">
                    <div className="ss-mini-title"><span /><strong /></div>
                    <div className="ss-mini-cards">
                      {[0, 1, 2].map((index) => <i className={stageP > 0.18 + index * 0.18 ? "active" : ""} key={index}><b style={{ width: `${Math.max(0, Math.min(100, (stageP - index * 0.15) * 150))}%` }} /></i>)}
                    </div>
                    <div className="ss-mini-proof"><span /><span /><span /></div>
                  </div>
                  <div className="ss-evidence-drawer" style={{ transform: `translateX(${mix(105, 0, range(stageP, 0.48, 0.76))}%)` }}><span>EVIDENCE</span><strong>Proof linked</strong><i>✓</i></div>
                  <div className="ss-cursor" style={{ left: `${mix(66, 82, range(stageP, 0.08, 0.6))}%`, top: `${mix(75, 35, range(stageP, 0.08, 0.6))}%` }} />
                  <div className="ss-click-pulse" style={{ opacity: 1 - range(stageP, 0.55, 0.75), transform: `scale(${mix(0.2, 2.8, range(stageP, 0.5, 0.75))})` }} />
                </div>
                <div className="ss-link-status" aria-hidden="true">
                  <span className={stageP > 0.18 ? "active" : ""}>01 CLAIM</span>
                  <i style={{ transform: `scaleX(${range(stageP, 0.22, 0.48)})` }} />
                  <span className={stageP > 0.48 ? "active" : ""}>02 UI STATE</span>
                  <i style={{ transform: `scaleX(${range(stageP, 0.52, 0.76)})` }} />
                  <span className={stageP > 0.76 ? "active" : ""}>03 PROOF LINKED</span>
                </div>
              </Scene>

              <Scene {...capture} reducedMotion={reducedMotion} className="ss-capture">
                <div className="ss-scene-number">03</div>
                <p className="ss-kicker">Capture deterministic frames</p>
                <h2>No dropped moments.<br /><em>No guesswork.</em></h2>
                <div className="ss-frame-count"><strong>{String(frameCount).padStart(3, "0")}</strong><span>/ 432 FRAMES</span></div>
                <div className="ss-capture-hud" aria-hidden="true">
                  <span><i />24 FPS LOCKED</span><span><i />0 DROPS</span><span><i />FRAME HASH ON</span>
                </div>
                <div className="ss-filmstrip-window">
                  <div className="ss-filmstrip" style={{ transform: `translateX(${mix(10, -18, captureP)}%)` }}>
                    {Array.from({ length: 7 }, (_, index) => (
                      <i className={frameCount > index * 58 ? "active" : ""} key={index}><b>{String(index + 1).padStart(2, "0")}</b><span /></i>
                    ))}
                  </div>
                </div>
              </Scene>

              <Scene {...close} reducedMotion={reducedMotion} className="ss-close">
                <p className="ss-kicker">From working product to watchable proof</p>
                <h2>Render something<br />people <em>remember.</em></h2>
                <div className="ss-output-card" style={{ transform: `translateY(${mix(24, 0, closeP)}px) scale(${mix(0.96, 1, closeP)})` }}>
                  <div className="ss-output-icon"><span /></div>
                  <div><span>FINAL OUTPUT</span><strong>vision-reel.mp4</strong></div>
                  <b>{closeP > 0.72 ? "READY" : "RENDERING"}</b>
                </div>
                <div className="ss-quality-row">
                  {["TIMING", "FRAMES", "LINKS", "PUBLIC SAFE"].map((label, index) => <span className={closeP > 0.22 + index * 0.14 ? "active" : ""} key={label}><i />{label}</span>)}
                </div>
              </Scene>
            </div>

            <div className="ss-camera-footer">
              <span>FRAME-BY-FRAME</span>
              <div><i style={{ width: `${p * 100}%` }} /></div>
              <strong>{String(Math.round(p * 100)).padStart(2, "0")}%</strong>
            </div>
          </div>
        </div>

        <footer className="ss-footer"><span>OPEN SOURCE / DETERMINISTIC / PUBLIC-SAFE</span><strong>CREATE-VISION-REEL</strong></footer>
      </div>
    </section>
  );
}
