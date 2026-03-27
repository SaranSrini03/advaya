"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/NavBar";
import { EVENT_CATALOG, mergeEventFlags, defaultEventFlags } from "@/app/lib/eventsCatalog";

export default function AdminRoom031Page() {
  const [flags, setFlags] = useState(() => defaultEventFlags());
  const [loaded, setLoaded] = useState(false);
  const [persisted, setPersisted] = useState(false);
  const [secret, setSecret] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/event-settings")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.flags) setFlags(mergeEventFlags(d.flags));
        setPersisted(!!d.persisted);
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

  const save = async () => {
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
      setMessage("Saved. Public events page will use these flags on next load.");
      setPersisted(true);
      if (data.flags) setFlags(mergeEventFlags(data.flags));
    } catch {
      setMessage("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-28 text-[color:var(--foreground)]">
        <h1 className="title-min font-mono text-3xl sm:text-4xl">Admin · Event registration</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-text)]">
          Toggles apply to the public Events page button label and click behavior. Persistence requires
          MongoDB and{" "}
          <code className="rounded bg-[color:var(--surface-muted)] px-1 py-0.5 text-xs">
            ADMIN_SECRET
          </code>{" "}
          in server env.
        </p>

        {!persisted && loaded && (
          <p className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
            Flags are not persisted yet (database missing or no document). Public page still shows
            defaults until you save successfully.
          </p>
        )}

        <div className="section-card mt-8 space-y-4 rounded-xl p-5">
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
                    <span className="text-sm text-[color:var(--muted-text)]">Registration closed</span>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="mt-2 w-full rounded-full bg-[color:var(--accent)] py-3 font-semibold text-[color:var(--button-fg)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save to database"}
          </button>
          {message ? (
            <p className="text-center text-sm text-[color:var(--muted-text)]">{message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
