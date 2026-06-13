import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { DashboardScreen, WorkflowScreen } from "../components/ProductScreens.jsx";
import { duration, localTime, sceneAt } from "./timeline.js";
import "../styles.css";
import "./render.css";

function StageBackground() {
  return (
    <>
      <div className="stage-grid" />
      <div className="stage-ribbon stage-ribbon-a" />
      <div className="stage-ribbon stage-ribbon-b" />
      <div className="stage-timeline-markers" />
      <div className="stage-frame" />
    </>
  );
}

function DocumentaryFooter({ beat, label }) {
  return (
    <div className="documentary-footer">
      <span>Vision Reel Starter</span>
      <span>{beat} / {label}</span>
    </div>
  );
}

function IntroScene({ t }) {
  const p = Math.min(1, t / 1.2);
  const station = (start) => Math.min(1, Math.max(0, (t - start) / 0.55));
  const scan = Math.min(1, t / 4.8);
  const beats = [
    ["01", "Business question", "Name the decision", 0.5],
    ["02", "Visual actor", "Pick one object", 1.0],
    ["03", "Product proof", "Show the state change", 1.5],
    ["04", "Evidence record", "Leave a trace", 2.0]
  ];
  return (
    <>
      <div className="framework-layout">
        <div className="framework-copy" style={{ opacity: 0.58 + p * 0.42, transform: `translateY(${(1 - p) * 18}px)` }}>
          <p className="label">Vision Reel Starter</p>
          <h1 className="film-title">Make the product act.</h1>
          <p className="film-copy">
            Start from the business question, then let the real interface prove the answer.
          </p>
          <div className="script-card">
            <div>
              <span>VO line</span>
              <strong>Which gap is blocking the next decision?</strong>
            </div>
            <div>
              <span>Visual actor</span>
              <strong>Customer discovery card</strong>
            </div>
          </div>
          <div className="proof-loop">
            <span className="proof-pill active">Question</span>
            <span className="proof-pill">Evidence</span>
            <span className="proof-pill">Decision</span>
            <span className="proof-pill">Record</span>
          </div>
        </div>
        <div className="framework-visual" style={{ opacity: 0.72 + p * 0.28 }}>
          <div className="story-board">
            <div className="board-header">
              <span>Timeline board</span>
              <strong>00:00-00:24</strong>
            </div>
            <div className="frame-strip">
              {["Question", "Real UI", "Proof", "Outcome"].map((label, index) => (
                <div className={scan > index * 0.22 ? "frame-cell active" : "frame-cell"} key={label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{label}</strong>
                </div>
              ))}
            </div>
            <div className="actor-map">
              {beats.map(([num, label, detail, at]) => {
                const a = station(at);
                return (
                  <div className="actor-row" key={label} style={{ opacity: 0.55 + a * 0.45, transform: `translateX(${(1 - a) * 18}px)` }}>
                    <span>{num}</span>
                    <div>
                      <strong>{label}</strong>
                      <p>{detail}</p>
                    </div>
                    <b />
                  </div>
                );
              })}
            </div>
            <div className="sync-console">
              <div className="sync-track"><span style={{ width: `${18 + scan * 78}%` }} /></div>
              <div className="sync-row">
                <span>Word anchors</span>
                <strong>{Math.round(12 + scan * 28)} locked</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DocumentaryFooter beat="01" label="question" />
    </>
  );
}

function ProductScene({ t }) {
  const showDashboard = t < 4.8;
  const pointerMarker = useMemo(() => {
    if (t < 1.8) return null;
    if (t < 4.8) return { x: 760 + Math.sin(t * 2) * 4, y: 340 };
    if (t < 8.8) return { x: 1200, y: 340 };
    return { x: 1120, y: 705 };
  }, [t]);

  return (
    <>
      <div className="video-page">
        <main className="app-shell">
          <aside className="sidebar">
            <div className="brand">Acme Skills</div>
            <div className={showDashboard ? "nav active" : "nav"}>Leader View</div>
            <div className={showDashboard ? "nav" : "nav active"}>Jordan Plan</div>
          </aside>
          <section className="workspace">
            {showDashboard ? <DashboardScreen filmT={t} /> : <WorkflowScreen filmT={t - 4.8} />}
          </section>
        </main>
      </div>
      {pointerMarker && <div className="pointer-marker" style={{ left: pointerMarker.x, top: pointerMarker.y }} />}
      <DocumentaryFooter beat="02" label="product proof" />
    </>
  );
}

function CloseScene({ t }) {
  const p = Math.min(1, t / 1.2);
  const readiness = Math.round(72 * Math.min(1, t / 2.4));
  return (
    <>
      <div className="closing-layout" style={{ opacity: 0.58 + p * 0.42, transform: `translateY(${(1 - p) * 18}px)` }}>
        <div className="closing-copy">
          <p className="label">Outcome</p>
          <h1 className="film-title">{readiness}% readiness, with proof.</h1>
          <p className="film-copy">
            The loop is visible: business question, personal evidence, focused plan, and a record leaders can trust.
          </p>
          <div className="proof-loop">
            {["Question", "Evidence", "Plan", "Record"].map((item, index) => (
              <span className={t > 0.9 + index * 0.35 ? "proof-pill active" : "proof-pill"} key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="outcome-board">
          <div className="outcome-score">
            <span>Readiness</span>
            <strong>{readiness}%</strong>
            <div className="bar" style={{ "--w": `${readiness}%` }}><span /></div>
          </div>
          <div className="handoff-list">
            {[
              ["Decision", "Customer discovery prioritized"],
              ["Evidence", "3 source checks attached"],
              ["Plan", "Sequenced actions ready"]
            ].map(([label, value], index) => (
              <div className={t > 1.4 + index * 0.45 ? "handoff-row active" : "handoff-row"} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DocumentaryFooter beat="03" label="outcome" />
    </>
  );
}

function VideoApp() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = Number(params.get("t") || 0);
    if (!Number.isNaN(initial)) setT(initial);
    if (params.get("render") === "1") document.body.classList.add("render");
    window.__filmSetT = (next) => setT(next);
    window.__filmReady = true;
    window.__filmDuration = duration;
  }, []);

  const scene = sceneAt(t);
  const lt = localTime(scene, t);

  return (
    <div className="video-stage">
      <StageBackground />
      {scene.id === "intro" && <IntroScene t={lt} />}
      {scene.id === "ui" && <ProductScene t={lt} />}
      {scene.id === "close" && <CloseScene t={lt} />}
    </div>
  );
}

export function mountVideoApp(node) {
  createRoot(node).render(<VideoApp />);
}
