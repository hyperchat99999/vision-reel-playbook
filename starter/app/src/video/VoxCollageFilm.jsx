import React from "react";
import collageConfig from "./vox-collage-config.json";
import { clamp, enterHoldExit, mix, range } from "./motion.js";

const FROM_VECTORS = {
  bottom: [0, 130],
  left: [-150, 16],
  right: [150, -12],
  top: [0, -130]
};

function ObjectGraphic({ action, kind }) {
  if (kind === "transcript" || kind === "transcript-anchor") {
    return (
      <div className="vox-transcript-lines">
        <i /><i /><i />
        <b style={{ opacity: action, transform: `rotate(-2deg) scale(${mix(0.72, 1, action)})` }}>{kind === "transcript-anchor" ? "PROOF" : "...PROOF..."}</b>
      </div>
    );
  }
  if (kind === "asset-bin") {
    return <div className="vox-asset-grid">{[0, 1, 2, 3].map((cell) => <i key={cell} style={{ opacity: mix(0.38, 1, clamp(action * 3 - cell * 0.55)) }}><b /></i>)}</div>;
  }
  if (kind === "timeline-gap" || kind === "timeline") {
    return <div className="vox-edit-timeline" style={{ "--playhead": `${mix(11, 82, action)}%` }}><i /><i /><b /><i /></div>;
  }
  if (kind === "mismatch") return <div className="vox-mismatch-mark"><i style={{ transform: `translateX(${-16 * action}px) rotate(18deg)` }} /><b style={{ transform: `scale(${mix(0.45, 1, action)})` }} /><i style={{ transform: `translateX(${16 * action}px) rotate(-18deg)` }} /></div>;
  if (kind === "product-proof") return <div className="vox-product-proof"><i /><span /><span /><b style={{ clipPath: `inset(0 ${100 - action * 100}% 0 0)` }} /></div>;
  if (kind === "connector") return <div className="vox-connector-line"><i style={{ transform: `scaleX(${action})` }} /><b style={{ opacity: action, transform: `translate(-50%,-40%) rotate(45deg) scale(${mix(0.55, 1, action)})` }} /></div>;
  if (kind === "sync-badge") return <div className="vox-sync-check"><i style={{ opacity: action, transform: `translate(-50%,-58%) rotate(42deg) scale(${mix(0.4, 1, action)})` }} /></div>;
  if (kind === "preview") return <div className="vox-preview-phone"><i style={{ clipPath: `inset(0 0 ${100 - action * 100}% 0)` }} /><span /><span /><b style={{ opacity: action }} /></div>;
  if (kind === "qc-card") return <div className="vox-qc-list">{[0, 1, 2].map((row) => <i key={row} style={{ opacity: mix(0.28, 1, clamp(action * 3.1 - row * 0.72)) }}><b /></i>)}</div>;
  if (kind === "export-card") return <div className="vox-export-progress"><i><b style={{ width: `${action * 100}%` }} /></i><span>{Math.round(action * 100)}%</span></div>;
  if (kind === "note") {
    return <div className="vox-note-lines"><i /><i /><i /></div>;
  }
  if (kind === "waveform") {
    return <div className="vox-wave-bars">{[3, 6, 10, 14, 8, 16, 12, 5, 9].map((height, index) => <i key={index} style={{ "--bar": height }} />)}</div>;
  }
  if (kind === "filmstrip") {
    return <div className="vox-film-cells">{[0, 1, 2, 3].map((cell) => <i key={cell} />)}</div>;
  }
  if (kind === "window") {
    return <div className="vox-window-ui"><i /><span /><span /><b /></div>;
  }
  if (kind === "cursor") return <div className="vox-cursor-shape" />;
  if (kind === "rail") {
    return <div className="vox-rail-line">{[0, 1, 2].map((node) => <i key={node} />)}</div>;
  }
  if (kind === "binder") return <div className="vox-binder"><i /><i /><i /></div>;
  if (kind === "projector") return <div className="vox-projector"><i /><i /><span /></div>;
  if (kind === "beam") return <div className="vox-beam-shape" />;
  if (kind === "final-frame") return <div className="vox-final-screen"><i /><span /><span /><b /></div>;
  if (kind === "seal") return <div className="vox-seal-mark"><i /></div>;
  return null;
}

function PaperObject({ item, localT, reducedMotion }) {
  const progress = reducedMotion ? Number(localT >= item.enter) : range(localT, item.enter, item.enter + 0.62);
  const action = reducedMotion ? progress : range(localT, item.enter + 0.45, item.enter + 1.35);
  const [fromX, fromY] = FROM_VECTORS[item.from] || FROM_VECTORS.bottom;
  const lift = mix(16, 0, progress);
  const objectStyle = {
    "--object-accent": "var(--vox-accent)",
    height: `${item.height}%`,
    left: `${item.x}%`,
    opacity: progress,
    top: `${item.y}%`,
    transform: `translate3d(${fromX * (1 - progress)}px, ${fromY * (1 - progress) + lift}px, 0) rotate(${item.rotate * progress}deg) scale(${mix(0.82, 1, progress)})`,
    width: `${item.width}%`
  };

  return (
    <div className={`vox-paper-object vox-kind-${item.kind}`} style={objectStyle}>
      <div className="vox-paper-edge" />
      <ObjectGraphic action={action} kind={item.kind} />
      <span className="vox-object-label">{item.label}</span>
    </div>
  );
}

function CollageBeat({ beat, index, reducedMotion, t }) {
  const localT = t - beat.start;
  const isFirst = index === 0;
  const isLast = index === collageConfig.beats.length - 1;
  const presence = reducedMotion
    ? Number(t >= beat.start && (isLast ? t <= beat.end : t < beat.end))
    : enterHoldExit(t, isFirst ? -0.01 : beat.start - 0.34, isFirst ? 0 : beat.start + 0.28, isLast ? beat.end + 1 : beat.end - 0.34, isLast ? beat.end + 1.1 : beat.end + 0.28);
  const copyIn = reducedMotion ? Number(localT >= 0) : range(localT, 0.08, 0.72);
  const copyOut = isLast || reducedMotion ? 1 : 1 - range(localT, 4.28, 4.84);
  const copyPresence = Math.min(copyIn, copyOut);

  return (
    <article
      className={`vox-beat vox-beat-${beat.id}`}
      style={{
        "--vox-accent": beat.accent,
        "--vox-bg": beat.background,
        "--vox-ink": beat.ink,
        opacity: presence,
        zIndex: index + 1
      }}
    >
      <div className="vox-field" />
      <div className="vox-collage-stage" aria-hidden="true">
        {beat.objects.map((item) => <PaperObject item={item} key={item.id} localT={localT} reducedMotion={reducedMotion} />)}
      </div>
      <div
        className="vox-beat-copy"
        style={{ opacity: copyPresence, transform: `translate3d(0, ${mix(34, 0, copyPresence)}px, 0)` }}
      >
        <p>{beat.kicker}</p>
        <h1>{beat.headline}</h1>
      </div>
      <div className="vox-narration-card" style={{ opacity: range(localT, 2.6, 3.18) * copyOut }}>
        <span>Voiceover</span>
        <p>{beat.narration}</p>
      </div>
    </article>
  );
}

export function VoxCollageFilm({ t, reducedMotion = false }) {
  const beats = collageConfig.beats;
  const duration = beats[beats.length - 1].end;
  const journey = clamp(t / duration);
  const current = beats.findIndex((beat) => t >= beat.start && t < beat.end);
  const currentIndex = current === -1 ? beats.length - 1 : current;

  return (
    <section className="preset-film vox-collage-film" aria-label="General-purpose editorial paper collage explainer">
      {beats.map((beat, index) => (
        <CollageBeat beat={beat} index={index} key={beat.id} reducedMotion={reducedMotion} t={t} />
      ))}
      <header className="vox-film-header">
        <div className="vox-brand-dot" />
        <span>{collageConfig.project.subject}</span>
        <b>{collageConfig.project.eyebrow}</b>
      </header>
      <div className="vox-journey" aria-hidden="true">
        <i style={{ height: `${journey * 100}%` }} />
        {beats.map((beat, index) => <b className={index <= currentIndex ? "active" : ""} key={beat.id} />)}
      </div>
      <footer className="vox-film-footer">
        <span>{String(currentIndex + 1).padStart(2, "0")} / {String(beats.length).padStart(2, "0")}</span>
        <strong>{t >= duration - 1.05 ? collageConfig.project.closingLine : "Assemble the meaning"}</strong>
        <i><b style={{ width: `${journey * 100}%` }} /></i>
      </footer>
    </section>
  );
}
