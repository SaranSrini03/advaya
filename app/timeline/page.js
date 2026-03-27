"use client"
import { useEffect, useState } from 'react';
import Navbar from "@/app/components/NavBar";

export default function HomePage() {
  const [moved, setMoved] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const timelineEvents = [
    { date: "Day 1", title: "Kickoff & Registrations", time: "9:00 AM" },
    { date: "Day 2", title: "Workshops & Coding", time: "10:00 AM" },
    { date: "Day 3", title: "Project Submissions", time: "2:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowTimeline(true), 500);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-shell relative w-screen h-screen overflow-hidden">
      <Navbar />



      <div className="relative z-10 h-full text-[color:var(--foreground)]">
        {/* Animated title */}
        <div className={`absolute w-full transition-all duration-1000 ${moved ? 'top-8' : 'top-1/2 -translate-y-1/2'}`}>
          <span className="title-min font-black lg:mt-6 mt-16 font-mono block text-center mx-auto text-5xl md:text-7xl">
            Timeline
          </span>
        </div>

        {/* Scrollable timeline container */}
        {showTimeline && (
          <div className="pt-40 h-full flex items-center justify-center">
            <div className="relative max-w-4xl w-full h-[70vh] px-4 overflow-y-auto scrollbar-hide">
              <div className="relative min-h-[500px] pb-8">
                {timelineEvents.map((event, index) => (
                  <div 
                    key={index}
                    className="relative py-8 pl-6 md:pl-8 pr-4 group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Timeline line */}
                    <div className="absolute left-0 top-0 w-0.5 md:w-1 h-full bg-emerald-500/30">
                      <div className="absolute top-0 left-0 w-full h-8 bg-emerald-500 animate-pulse" />
                    </div>
                    
                    {/* Event dot */}
                    <div className="absolute left-0 top-1/2 -translate-x-[5px] md:-translate-x-[7px] -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full" />

                    <div className="section-card ml-8 md:ml-12 p-4 md:p-6 rounded-xl hover:border-[color:var(--accent)] transition-all">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-4">
                        <h3 className="text-lg md:text-xl font-mono text-emerald-300">
                          {event.title}
                        </h3>
                        <span className="font-mono text-xs md:text-sm text-emerald-500 mt-1 md:mt-0">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-emerald-200 font-mono text-xs md:text-sm">
                        {event.time}
                      </p>
                    </div>
                  </div>
                ))}
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