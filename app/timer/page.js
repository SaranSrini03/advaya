import Navbar from "@/app/components/NavBar";
import CountdownTimer from "@/app/components/Countdown";
import ShapeGrid from "@/app/components/ShapeGrid";

export default function TimerPage() {
  return (
    <div className="page-shell relative w-screen min-h-screen overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 z-0 min-h-[100dvh]">
        <div className="absolute inset-0 h-full min-h-[100dvh] w-full">
          <ShapeGrid
            direction="right"
            speed={0.9}
            borderColor="rgba(134,239,172,0.22)"
            hoverFillColor="rgba(16,185,129,0.22)"
            squareSize={44}
            shape="square"
            hoverTrailAmount={10}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute top-1/4 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[color:var(--accent)]/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-[color:var(--accent-soft)]/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-2 sm:px-4 pt-24 pb-12">
        <div className="text-center max-w-[120rem] w-full px-4 sm:px-6 py-12 md:px-10 md:py-16 bg-transparent border-none shadow-none">
          <p className="inline-flex items-center rounded-full bg-transparent px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[color:var(--muted-text)]">
            Advaya 2k26
          </p>


          <div className="mt-14 flex items-center justify-center">
            <div className="w-full max-w-[110rem] overflow-x-auto rounded-3xl border border-[color:var(--accent)]/35 bg-black/20 px-16 py-12 sm:px-24 sm:py-14 md:px-28 md:py-16 text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-mono tracking-wide leading-none text-[color:var(--foreground)] backdrop-blur-sm whitespace-nowrap [font-variant-numeric:tabular-nums]">
              <CountdownTimer
                displayMode="hms"
                durationHours={18}
                durationMinutes={15}
                durationSeconds={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
