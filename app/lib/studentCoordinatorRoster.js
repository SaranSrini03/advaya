const MAX_COORDINATORS = 80;
const MAX_NAME_LENGTH = 120;

const DEFAULT_STUDENT_COORDINATOR_NAMES = [
  "Nitharsan Babu V",
  "Rakshitha L",
  "Guru Prasath M",
  "Naveen Rajan M",
  "Saran Srinivasan V",
  "Neha",
  "Bhavani",
  "Tejashree",
  "Sonu",
  "Tejasvi Sai",
  "Yashwanth V",
  "Vijaya Raman",
  "Yashwanth K",
  "Pranathi D K",
  "Niveditha",
  "Anusha",
  "Sankeerthana",
  "Thiru Maran",
  "Nidharsan",
  "Ananya",
  "Paun Kalyan",
  "Rukmini V M",
  "Hari Prasath",
  "Gaurav Kumar",
  "Imaya",
  "Ashuthosh Raj",
  "Rakshitha K",
  "Sanjana",
  "Mayur Achar",
  "Sanjana L",
  "Chethan",
  "Kusuma",
];

export function defaultStudentCoordinatorNames() {
  return [...DEFAULT_STUDENT_COORDINATOR_NAMES];
}

/** Appends Sonu and Tejasvi Sai when missing so older saved rosters still show them on /teams. */
export function ensureCoordinatorList(names) {
  const required = ["Sonu", "Tejasvi Sai"];
  const out = [...names];
  const seen = new Set(names);
  for (const name of required) {
    if (!seen.has(name)) {
      out.push(name);
      seen.add(name);
    }
  }
  return out;
}

export function sanitizeStudentCoordinatorNames(input) {
  if (!Array.isArray(input)) {
    return defaultStudentCoordinatorNames();
  }
  const out = [];
  const seen = new Set();
  for (const item of input) {
    if (out.length >= MAX_COORDINATORS) break;
    const raw = typeof item === "string" ? item : String(item ?? "");
    const s = raw.trim().slice(0, MAX_NAME_LENGTH);
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out.length ? out : defaultStudentCoordinatorNames();
}
