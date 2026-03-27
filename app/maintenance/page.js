export const metadata = {
  title: "Under maintenance · Advaya 2k26",
};

export default function MaintenancePage() {
  return (
    <div className="page-shell flex min-h-screen flex-col items-center justify-center px-6 text-center text-[color:var(--foreground)]">
      <p className="title-min font-mono text-2xl sm:text-3xl">Under maintenance</p>
      <p className="mt-4 max-w-md text-sm text-[color:var(--muted-text)]">
        We are updating the site. Check back soon.
      </p>
    </div>
  );
}
