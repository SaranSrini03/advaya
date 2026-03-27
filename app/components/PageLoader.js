/** Full-viewport route loading UI for Next.js loading.js Suspense fallbacks. */
export default function PageLoader() {
  return (
    <div className="page-shell flex min-h-screen w-full items-center justify-center">
      <div
        className="flex flex-col items-center gap-4"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div
          className="h-10 w-10 rounded-full border-2 border-[color:var(--accent)]/25 border-t-[color:var(--accent)] animate-spin"
          aria-hidden
        />
        <p className="font-mono text-sm text-[color:var(--muted-text)]">Loading</p>
      </div>
    </div>
  );
}
