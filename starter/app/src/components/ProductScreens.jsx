import { actions, dashboardSignals, evidence, gaps, proof } from "../data/sampleData.js";

const ease = (x) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
const ramp = (t, start, duration = 0.6) => ease((t - start) / duration);
const tones = ["tone-blue", "tone-amber", "tone-teal"];

function countTo(value, p) {
  return Math.round(value * p);
}

function Sparkline({ active = false }) {
  return (
    <div className={active ? "sparkline active" : "sparkline"}>
      {[24, 42, 35, 58, 52, 76, 72].map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

export function DashboardScreen({ filmT = null }) {
  const p = filmT == null ? 1 : ramp(filmT, 1.1, 0.9);
  const active = filmT != null && filmT >= 1.8 && filmT < 4.6;
  const evidenceP = filmT == null ? 1 : ramp(filmT, 3.1, 0.7);
  const bandP = filmT == null ? 1 : ramp(filmT, 0.35, 0.7);

  return (
    <div className="dashboard-screen">
      <div className="page-head">
        <div>
          <p className="section-kicker">Executive view</p>
          <h1 className="page-title">Leader Readiness</h1>
          <p className="page-subtitle">A fictional dashboard for capability planning.</p>
        </div>
        <div className="signal-strip">
          {dashboardSignals.map((signal, index) => (
            <div className="signal" key={signal.label} style={{ opacity: filmT == null ? 1 : 0.55 + ramp(filmT, 0.6 + index * 0.22, 0.5) * 0.45 }}>
              <span>{signal.label}</span>
              <strong>{countTo(signal.value, p)}</strong>
            </div>
          ))}
        </div>
      </div>

      <section className="insight-band" style={{ opacity: 0.55 + bandP * 0.45, transform: `translateY(${(1 - bandP) * 12}px)` }}>
        <div className="decision-copy">
          <span className="label">Decision frame</span>
          <strong>Which capability gap should become a funded action plan?</strong>
          <p>Follow one gap from signal to evidence to an assigned plan.</p>
        </div>
        <div className="readiness-pulse">
          <span>Readiness lift</span>
          <strong>+18 pts</strong>
          <Sparkline active={active} />
        </div>
        <div className="proof-tags">
          <span>Role evidence</span>
          <span>Manager review</span>
          <span>Plan ready</span>
        </div>
      </section>

      <div className="grid three priority-grid">
        {gaps.map((gap, index) => {
          const appear = filmT == null ? 1 : ramp(filmT, 1.3 + index * 0.28, 0.5);
          return (
            <article
              className={`card priority-card ${tones[index]} ${active && index === 1 ? "hot" : ""}`}
              key={gap.label}
              style={{ opacity: 0.48 + appear * 0.52, transform: `translateY(${(1 - appear) * 14}px)` }}
            >
              <div className="card-topline">
                <div className="label">{gap.label}</div>
                <span className="rank-badge">P{index + 1}</span>
              </div>
              <div className="metric-row">
                <div className="metric">{countTo(gap.value, p)}%</div>
                <Sparkline active={active && index === 1} />
              </div>
              <div className="bar" style={{ "--w": `${countTo(gap.value, p)}%` }}>
                <span />
              </div>
              <div className="card-row">
                <span className={gap.status === "healthy" ? "chip confirmed" : "chip"}>{gap.status}</span>
                <span className="mini-stat">{gap.owners} owners</span>
                <span className={gap.delta.startsWith("+") ? "mini-stat good" : "mini-stat warn"}>{gap.delta}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="dashboard-bottom" style={{ opacity: 0.42 + evidenceP * 0.58, transform: `translateY(${(1 - evidenceP) * 14}px)` }}>
        <section className={`card evidence-card ${active ? "hot" : ""}`}>
          <div className="card-topline">
            <div className="label">Evidence behind active gap</div>
            <span className="rank-badge">3 sources</span>
          </div>
          <div className="evidence-list">
            {evidence.map((item, index) => (
              <div className="evidence-item" key={item}>
                <span className="dot" />
                <span>{item}</span>
                <strong>{index === 0 ? "role" : index === 1 ? "review" : "manager"}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="card compact-proof">
          <div className="label">Next action</div>
          <div className="action-title">Build Jordan's discovery plan</div>
          <p>One active gap becomes a sequenced plan, not a generic course list.</p>
          <div className="next-action-stack">
            <span>Assign owner</span>
            <span>Attach evidence</span>
            <span>Record decision</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export function WorkflowScreen({ filmT = null }) {
  const explainOpen = filmT == null || filmT >= 5.2;
  const streamP = filmT == null ? 1 : ramp(filmT, 6.0, 2.2);
  const dimPlan = filmT != null && filmT >= 5.2 && filmT < 8.5;
  const approved = filmT != null && filmT >= 8.8;
  const guardP = filmT == null ? 1 : ramp(filmT, 7.4, 0.8);
  const words = "Recommended because the capability gap is active, the role requires it, and Jordan has not yet shown proof.";
  const visible = words.split(" ").slice(0, Math.max(1, Math.round(words.split(" ").length * streamP))).join(" ");

  return (
    <div className="workflow-screen">
      <div className="page-head workflow-head">
        <div>
          <p className="section-kicker">Anchor object</p>
          <h1 className="page-title">Jordan's Focus Plan</h1>
          <p className="page-subtitle">The anchor object is {proof.anchorObject}.</p>
        </div>
        <div className="proof-summary">
          <span>Confirmed actions</span>
          <strong>{proof.confirmedActions}</strong>
          <p>{proof.readiness}% readiness baseline</p>
        </div>
      </div>

      <div className="workflow">
        <section className={`card plan-card ${dimPlan ? "dim" : ""}`}>
          <div className="card-topline">
            <div className="label">Confirmed actions</div>
            <span className={approved ? "chip confirmed" : "chip"}>{approved ? "approved" : "draft"}</span>
          </div>
          {actions.map((action, index) => {
            const appear = filmT == null ? 1 : ramp(filmT, 0.8 + index * 0.3, 0.5);
            const hot = filmT != null && filmT >= 2.2 + index * 0.7 && filmT < 2.9 + index * 0.7;
            return (
              <div
                className={`timeline-row ${hot ? "hot" : ""}`}
                key={action.title}
                style={{ opacity: 0.45 + appear * 0.55, transform: `translateY(${(1 - appear) * 10}px)` }}
              >
                <div className="month">{action.month}</div>
                <div>
                  <div className="action-title">{action.title}</div>
                  <p>{action.reason}</p>
                  <span className={approved ? "chip confirmed" : "chip"}>{approved ? "recorded" : action.type}</span>
                </div>
              </div>
            );
          })}
          <div className="proof-ledger">
            <span>Owner: Manager</span>
            <span>Review: Sep 12</span>
            <span>Status: Ready</span>
          </div>
        </section>

        <aside className={`card explain ${explainOpen ? "hot" : ""}`}>
          <div className="card-topline">
            <div className="label">Why this plan</div>
            <span className="rank-badge">explainable</span>
          </div>
          {explainOpen ? (
            <p className="stream">
              {visible}
              {filmT != null && streamP < 1 ? " |" : ""}
            </p>
          ) : (
            <p className="stream">Open the explanation to show evidence.</p>
          )}
          <div className="confidence-meter">
            <span>Confidence</span>
            <strong>High</strong>
          </div>
          <div className="guardrail-list" style={{ opacity: 0.45 + guardP * 0.55, transform: `translateY(${(1 - guardP) * 10}px)` }}>
            <div><span className="dot" /> Capacity checked</div>
            <div><span className="dot" /> Evidence attached</div>
            <div><span className="dot" /> Manager review ready</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
