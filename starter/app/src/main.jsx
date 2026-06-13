import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { DashboardScreen, WorkflowScreen } from "./components/ProductScreens.jsx";
import "./styles.css";

function App() {
  const [screen, setScreen] = useState("dashboard");

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">Acme Skills</div>
        <button className={screen === "dashboard" ? "nav active" : "nav"} onClick={() => setScreen("dashboard")}>
          Leader View
        </button>
        <button className={screen === "workflow" ? "nav active" : "nav"} onClick={() => setScreen("workflow")}>
          Jordan Plan
        </button>
      </aside>
      <section className="workspace">
        {screen === "dashboard" ? <DashboardScreen /> : <WorkflowScreen />}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

