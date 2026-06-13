export const gaps = [
  { label: "Forecast quality", value: 72, status: "open", delta: "+8 pts", owners: 14 },
  { label: "Customer discovery", value: 64, status: "open", delta: "-6 pts", owners: 22 },
  { label: "Executive updates", value: 88, status: "healthy", delta: "+3 pts", owners: 9 }
];

export const actions = [
  {
    month: "Jul",
    title: "Run forecast review with manager",
    type: "Experience",
    reason: "Builds evidence against the active capability gap."
  },
  {
    month: "Aug",
    title: "Complete customer discovery module",
    type: "Education",
    reason: "Targets the highest-priority skill with formal practice."
  },
  {
    month: "Sep",
    title: "Shadow account planning session",
    type: "Exposure",
    reason: "Adds peer context before the next review checkpoint."
  }
];

export const proof = {
  readiness: 72,
  confirmedActions: 3,
  anchorObject: "Customer discovery"
};

export const evidence = [
  "Role requires discovery notes on every strategic account",
  "Recent reviews show inconsistent qualification depth",
  "Manager marked discovery as a current-quarter priority"
];

export const dashboardSignals = [
  { label: "Open gaps", value: 3 },
  { label: "People affected", value: 45 },
  { label: "Actions ready", value: 9 }
];
