const MAX_COORDINATORS = 80;
const MAX_NAME_LENGTH = 120;

const DEFAULT_STUDENT_COORDINATOR_NAMES = [
  "Guru Prasath",
  "Naveen",
  "Saran",
  "Neha",
  "Bhavani",
  "Tejashree",
  "Yashwanth V",
  "Nitharsan Babu V",
  "Rakshitha L",
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

export function sanitizeStudentCoordinatorNames(input) {
  if (!Array.isArray(input)) {
    return defaultStudentCoordinatorNames();
  }
  const out = [];
  for (const item of input) {
    if (out.length >= MAX_COORDINATORS) break;
    const raw = typeof item === "string" ? item : String(item ?? "");
    const s = raw.trim().slice(0, MAX_NAME_LENGTH);
    if (s) out.push(s);
  }
  return out.length ? out : defaultStudentCoordinatorNames();
}
