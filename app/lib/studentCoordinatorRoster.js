const MAX_COORDINATORS = 80;
const MAX_NAME_LENGTH = 120;
const REMOVED_COORDINATOR_NAME_KEYS = new Set([
  "tejashree",
  "gaurav kumar",
  "imaya",
  "ashuthosh raj",
  "rakshitha k",
  "chethan",
]);

function nameKey(name) {
  return String(name ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const DEFAULT_STUDENT_COORDINATOR_NAMES = [
  "Nitharsan Babu V",
  "Rakshitha L",
  "Guru Prasath M",
  "Naveen Rajan M",
  "Saran Srinivasan V",
  "Neha",
  "Bhavani",
  "Sonu",
  "Tejasvi Sai",
  "Yashwanth V",
  "Vijaya Raman",
  "Yashwanth K",
  "Pranathi D K",
  "Niveditha",
  "Anusha",
  "Sankeerthana",
  "Sanjay",
  "Sarathy",
  "Srinidhi",
  "Thiru Maran",
  "Nidharsan",
  "Ananya",
  "Paun Kalyan",
  "Rukmini V M",
  "Hari Prasath",
  "Jeevitha",
  "Kishore",
  "Sanjana",
  "Mayur Achar",
  "Sanjana L",
  "Thrupthi Chandana G",
  "Kusuma",
];

export function defaultStudentCoordinatorNames() {
  return [...DEFAULT_STUDENT_COORDINATOR_NAMES];
}

/** Appends Sonu and Tejasvi Sai when missing so older saved rosters still show them on /teams. */
export function ensureCoordinatorList(names) {
  const required = [
    "Sonu",
    "Tejasvi Sai",
    "Srinidhi",
    "Sanjay",
    "Sarathy",
    "Kishore",
    "Jeevitha",
  ];
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
    const normalized = s === "Sanjana" ? "Thrupthi Chandana G" : s;
    if (REMOVED_COORDINATOR_NAME_KEYS.has(nameKey(normalized))) continue;
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out.length ? out : defaultStudentCoordinatorNames();
}
