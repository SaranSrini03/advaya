"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/NavBar";
import { EVENT_CATALOG, mergeEventFlags, defaultEventFlags } from "@/app/lib/eventsCatalog";

const SECTIONS = [
  { id: "events", label: "Events" },
  { id: "shutdown", label: "Shutdown" },
];

export default function AdminRoom031Page() {
  const [section, setSection] = useState("events");
  const [flags, setFlags] = useState(() => defaultEventFlags());
  const [loaded, setLoaded] = useState(false);
  const [persisted, setPersisted] = useState(false);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [maintenancePersisted, setMaintenancePersisted] = useState(false);
  const [secret, setSecret] = useState("");
  const [saving, setSaving] = useState(false);
  const [savingMaintenance, setSavingMaintenance] = useState(false);
  const [message, setMessage] = useState("");
  const [maintenanceMessage, setMaintenanceMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([
      fetch("/api/event-settings").then((r) => r.json()),
      fetch("/api/site-status").then((r) => r.json()),
    ])
      .then((results) => {
        if (cancelled) return;
        const ev = results[0];
        if (ev.status === "fulfilled" && ev.value) {
          const eventData = ev.value;
          if (eventData.flags) setFlags(mergeEventFlags(eventData.flags));
          setPersisted(!!eventData.persisted);
        }
        const st = results[1];
        if (st.status === "fulfilled" && st.value && typeof st.value.maintenance === "boolean") {
          setMaintenanceEnabled(st.value.maintenance);
          setMaintenancePersisted(true);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setClosed = (key, registrationClosed) => {
    setFlags((prev) => ({
      ...prev,
      [key]: { registrationClosed },
    }));
  };

  const saveEvents = async () => {
    if (!secret.trim()) {
      setMessage("Enter the admin secret to save.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/event-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret.trim(),
        },
        body: JSON.stringify({ flags }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.error || "Save failed");
        return;
      }
      setMessage(
        "Saved. Open Events tabs refresh automatically; new visits always load the latest flags."
      );
      setPersisted(true);
      if (data.flags) setFlags(mergeEventFlags(data.flags));
      try {
        const bc = new BroadcastChannel("advaya-site-settings");
        bc.postMessage({ type: "events" });
        bc.close();
      } catch {
        /* ignore */
      }
    } catch {
      setMessage("Network error");
    } finally {
      setSaving(false);
    }
  };

  const saveMaintenance = async () => {
    if (!secret.trim()) {
      setMaintenanceMessage("Enter the admin secret to save.");
      return;
    }
    setSavingMaintenance(true);
    setMaintenanceMessage("");
    try {
      const res = await fetch("/api/admin/site-maintenance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret.trim(),
        },
        body: JSON.stringify({ maintenanceEnabled }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMaintenanceMessage(data.error || "Save failed");
        return;
      }
      if (typeof data.maintenanceEnabled === "boolean") {
        setMaintenanceEnabled(data.maintenanceEnabled);
      }
      setMaintenanceMessage(
        data.maintenanceEnabled
          ? "Maintenance is on. Public visitors see the maintenance page after reload or next visit."
          : "Site is live again. Visitors may need one refresh."
      );
      setMaintenancePersisted(true);
      try {
        const bc = new BroadcastChannel("advaya-site-settings");
        bc.postMessage({ type: "maintenance" });
        bc.close();
      } catch {
        /* ignore */
      }
    } catch {
      setMaintenanceMessage("Network error");
    } finally {
      setSavingMaintenance(false);
    }
  };

  return (
    <div className="page-shell relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col gap-6 px-4 pb-16 pt-24 text-[color:var(--foreground)] md:flex-row md:px-6">
        <aside className="shrink-0 md:w-56">
          <h1 className="title-min font-mono text-xl sm:text-2xl">Admin</h1>
          <p className="mt-1 text-xs text-[color:var(--muted-text)]">Site controls</p>
          <nav className="mt-6 flex flex-row gap-2 md:flex-col md:gap-1" aria-label="Admin sections">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  section === s.id
                    ? "bg-[color:var(--accent)]/25 text-[color:var(--foreground)] ring-1 ring-[color:var(--accent)]/50"
                    : "text-[color:var(--muted-text)] hover:bg-[color:var(--surface-muted)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="section-card space-y-4 rounded-xl p-5">
            <label className="block text-sm font-medium text-[color:var(--muted-text)]">
              Admin secret
            </label>
            <input
              type="password"
              autoComplete="off"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full rounded-lg border border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] px-3 py-2 text-[color:var(--foreground)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
              placeholder="From ADMIN_SECRET in .env"
            />
          </div>

          {section === "events" && (
            <div className="section-card mt-6 space-y-4 rounded-xl p-5">
              <div>
                <h2 className="font-mono text-lg font-semibold text-[color:var(--foreground)]">
                  Event registration
                </h2>
                <p className="mt-1 text-sm text-[color:var(--muted-text)]">
                  Toggles apply to the public Events page button label and click behavior.
                </p>
              </div>

              {!persisted && loaded && (
                <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
                  Flags are not persisted yet (database missing or no document). Public page still
                  shows defaults until you save successfully.
                </p>
              )}

              <ul className="divide-y divide-[color:var(--surface-border)]">
                {EVENT_CATALOG.map((ev) => {
                  const closed = flags[ev.key]?.registrationClosed ?? false;
                  return (
                    <li
                      key={ev.key}
                      className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-mono font-semibold text-[color:var(--foreground)]">
                          {ev.title}
                        </p>
                        <p className="text-xs text-[color:var(--muted-text)]">{ev.key}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[color:var(--muted-text)]">Know more</span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={closed}
                          aria-label={`${ev.title}: registration ${closed ? "closed" : "open"}`}
                          onClick={() => setClosed(ev.key, !closed)}
                          className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
                            closed ? "bg-rose-700/75" : "bg-emerald-700/65"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-[color:var(--button-fg)] shadow transition-transform ${
                              closed ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span className="text-sm text-[color:var(--muted-text)]">
                          Registration closed
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={saveEvents}
                disabled={saving}
                className="mt-2 w-full rounded-full bg-[color:var(--accent)] py-3 font-semibold text-[color:var(--button-fg)] disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save events to database"}
              </button>
              {message ? (
                <p className="text-center text-sm text-[color:var(--muted-text)]">{message}</p>
              ) : null}
            </div>
          )}

          {section === "shutdown" && (
            <div className="section-card mt-6 space-y-4 rounded-xl p-5">
              <div>
                <h2 className="font-mono text-lg font-semibold text-[color:var(--foreground)]">
                  Site shutdown
                </h2>
                <p className="mt-1 text-sm text-[color:var(--muted-text)]">
                  When on, visitors see an under-maintenance page. Admin at{" "}
                  <code className="rounded bg-[color:var(--surface-muted)] px-1 py-0.5 text-xs">
                    /room031
                  </code>{" "}
                  stays available.
                </p>
              </div>

              {!maintenancePersisted && loaded && (
                <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
                  Could not confirm maintenance state from the server. Saving still works if the
                  database and secret are configured.
                </p>
              )}

              <div className="flex flex-col gap-4 rounded-lg border border-[color:var(--surface-border)] bg-[color:var(--panel-bg)]/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-[color:var(--foreground)]">Public site</p>
                  <p className="text-sm text-[color:var(--muted-text)]">
                    {maintenanceEnabled ? "Under maintenance" : "Normal"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[color:var(--muted-text)]">Live</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={maintenanceEnabled}
                    aria-label={`Public site ${maintenanceEnabled ? "under maintenance" : "live"}`}
                    onClick={() => setMaintenanceEnabled(!maintenanceEnabled)}
                    className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
                      maintenanceEnabled ? "bg-rose-700/75" : "bg-emerald-700/65"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-[color:var(--button-fg)] shadow transition-transform ${
                        maintenanceEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-[color:var(--muted-text)]">Maintenance</span>
                </div>
              </div>

              <button
                type="button"
                onClick={saveMaintenance}
                disabled={savingMaintenance}
                className="w-full rounded-full bg-[color:var(--accent)] py-3 font-semibold text-[color:var(--button-fg)] disabled:opacity-60"
              >
                {savingMaintenance ? "Saving…" : "Save shutdown to database"}
              </button>
              {maintenanceMessage ? (
                <p className="text-center text-sm text-[color:var(--muted-text)]">
                  {maintenanceMessage}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
