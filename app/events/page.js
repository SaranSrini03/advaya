"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import MarqueeBanner from "@/app/components/MarqueeBanner.js";
import { EVENT_CATALOG, mergeEventFlags, defaultEventFlags } from "@/app/lib/eventsCatalog";

export default function EventPage() {
  const [moved, setMoved] = useState(false);
  const [showBoxes, setShowBoxes] = useState(false);
  const [flags, setFlags] = useState(() => defaultEventFlags());
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowBoxes(true), 1000);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadFlags = () => {
      fetch("/api/event-settings")
        .then((r) => r.json())
        .then((d) => {
          if (cancelled || !d.flags) return;
          setFlags(mergeEventFlags(d.flags));
        })
        .catch(() => {});
    };

    loadFlags();

    let bc;
    try {
      bc = new BroadcastChannel("advaya-event-settings");
      bc.onmessage = () => loadFlags();
    } catch {
      /* ignore */
    }

    return () => {
      cancelled = true;
      try {
        bc?.close();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const handleReadMore = (title) => {
    const formattedTitle = title.toLowerCase().replace(/[-/]/g, "").replace(/\s+/g, "-");
    router.push(`/events/${formattedTitle}`);
  };

  return (
    <div className="page-shell relative w-screen h-screen overflow-hidden">
      <Navbar />
      <MarqueeBanner className="mt-4 md:mt-6" />

      <div className="relative  z-10 h-full text-[color:var(--foreground)]">
        <div
          className={`fixed w-full mt-10 p-5 transition-all duration-1000 ${moved ? "top-16 md:top-20" : "top-1/2 -translate-y-1/2"} z-30`}
        >
          <span className="title-min font-black font-mono block text-center mx-auto text-4xl sm:text-5xl md:text-6xl">
            Events
          </span>
        </div>

        {showBoxes && (
          <div className="mt-38 pt-10 md:pt-32 h-full">
            <div className="h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)] overflow-y-auto scrollbar-hide px-4 pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
                {EVENT_CATALOG.map((event, index) => {
                  const registrationClosed = flags[event.key]?.registrationClosed ?? false;
                  return (
                    <div
                      key={event.key}
                      className="section-card rounded-xl p-4 md:p-6 animate-fade-in-up opacity-0 flex flex-col justify-between min-h-[300px]"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="aspect-video bg-[color:var(--surface-muted)] rounded-lg mb-3 md:mb-4 overflow-hidden min-h-[150px]">
                        <img
                          src={event.img}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-mono mb-3 md:mb-4 text-emerald-300 text-center">
                        {event.title}
                      </h3>
                      <button
                        type="button"
                        className={`w-full py-2 md:py-3 text-sm md:text-base font-mono rounded-full transition-all ${
                          registrationClosed
                            ? "bg-zinc-600/90 text-zinc-100 cursor-not-allowed"
                            : "bg-emerald-500/80 hover:bg-emerald-600 hover:scale-[1.02] text-[color:var(--button-fg)]"
                        }`}
                        onClick={() => {
                          if (registrationClosed) {
                            window.alert("Registration closed for this event.");
                            return;
                          }
                          handleReadMore(event.title);
                        }}
                      >
                        {registrationClosed ? "Registration closed" : "Know more"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
