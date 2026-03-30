/** Stable keys must match `/events/[slug]` from `handleEventSlug(title)`. */
export const EVENT_CATALOG = [
  { key: "20hour-hackathon", title: "20-Hour Hackathon", img: "/events/20hourshackathon.png" },
  { key: "paper-presentation", title: "Paper Presentation", img: "/events/paperpresentation.png" },
  { key: "webathon", title: "Webathon", img: "/events/webathon.png" },
  { key: "mobilathon", title: "Mobilathon", img: "/events/mobilathon.png" },
  { key: "connections", title: "Connections", img: "/events/connections.png" },
  { key: "c-debugging", title: "C Debugging", img: "/events/debug.png" },
];

const FLAG_KEYS = new Set(EVENT_CATALOG.map((e) => e.key));

export function titleToEventSlug(title) {
  return title.toLowerCase().replace(/[-/]/g, "").replace(/\s+/g, "-");
}

export function defaultEventFlags() {
  const flags = {};
  for (const e of EVENT_CATALOG) {
    flags[e.key] = { registrationClosed: false };
  }
  return flags;
}

/** Merges DB document with catalog so new events get defaults. */
export function mergeEventFlags(stored) {
  const base = defaultEventFlags();
  if (!stored || typeof stored !== "object") return base;
  for (const key of FLAG_KEYS) {
    const row = stored[key];
    if (row && typeof row.registrationClosed === "boolean") {
      base[key] = { registrationClosed: row.registrationClosed };
    }
  }
  return base;
}

export function sanitizeIncomingFlags(body) {
  const out = defaultEventFlags();
  if (!body || typeof body !== "object") return out;
  const incoming = body.flags !== undefined ? body.flags : body;
  if (!incoming || typeof incoming !== "object") return out;
  for (const key of FLAG_KEYS) {
    const v = incoming[key];
    if (v && typeof v.registrationClosed === "boolean") {
      out[key] = { registrationClosed: v.registrationClosed };
    }
  }
  return out;
}
