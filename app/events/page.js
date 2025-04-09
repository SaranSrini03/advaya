"use client"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";
import MarqueeBanner from "@/app/components/MarqueeBanner.js";


export default function EventPage() {
    const [dots, setDots] = useState([]);
    const [moved, setMoved] = useState(false);
    const [showBoxes, setShowBoxes] = useState(false);
    const router = useRouter();

    const events = [
        { id: 1, title: "24-Hour Hackathon", img: "/hack24img.jpg" },
        { id: 8, title: "Paper", img: "/paper.jpg" },
        { id: 2, title: "Webathon", img: "/webathon.jpeg" },
        { id: 3, title: "UI/UX Design Challenge", img: "/uiux.jpeg" },
        { id: 4, title: "Mobilathon", img: "/mobilathon.jpeg" },
        { id: 5, title: "Connections", img: "/connection.jpeg" },
        { id: 6, title: "C Debugging", img: "/debug.jpeg" },
        { id: 7, title: "Chatbot", img: "/chatbot.jpg" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setMoved(true);
            setTimeout(() => setShowBoxes(true), 1000);
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setDots([...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        })));
    }, []);

    const handleReadMore = (title) => {
        const formattedTitle = title.toLowerCase().replace(/[-/]/g, "").replace(/\s+/g, "-");
        router.push(`/events/${formattedTitle}`);
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00]">
            <Navbar />
            <Noise />
            <MarqueeBanner className="mt-4 md:mt-6" />



            <div className="absolute inset-0 opacity-20">
                {dots.map((dot, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-300 rounded-full animate-pulse"
                        style={{
                            left: dot.left,
                            top: dot.top,
                            animationDelay: `${i * 0.2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative  z-10 h-full text-white">
                <div className={`fixed w-full mt-10 p-5 transition-all duration-1000 ${moved ? 'top-16 md:top-20' : 'top-1/2 -translate-y-1/2'} z-30`}>
                    <span
                        className="glitch font-black font-mono block text-center mx-auto"
                        data-text="Events"
                        style={{
                            fontSize: "clamp(2rem, 8vw, 4.5rem)",
                            "--after-shadow": "-4px 0 #ff6600",
                            "--before-shadow": "4px 0 #ffcc00",
                            textShadow: '0 0 8px rgba(255,140,0,0.5)'
                        }}
                    >
                        Events
                    </span>
                </div>

                {showBoxes && (
                    <div className="mt-38 pt-10 md:pt-32 h-full">
                        <div className="h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)] overflow-y-auto scrollbar-hide px-4 pb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
                                {events.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className="bg-black/40 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-orange-300/20 animate-fade-in-up opacity-0 flex flex-col justify-between min-h-[300px]"
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <div className="aspect-video bg-orange-900/30 rounded-lg mb-3 md:mb-4 overflow-hidden min-h-[150px]">
                                            <img
                                                src={event.img}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-mono mb-3 md:mb-4 text-orange-300 text-center">
                                            {event.title}
                                        </h3>
                                        <button
                                            className="w-full py-2 md:py-3 bg-orange-500/80 hover:bg-orange-600 text-sm md:text-base font-mono rounded-full cursor-pointer transition-all hover:scale-[1.02]"
                                            onClick={() => handleReadMore(event.title)}
                                        >
                                            Know More
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <style jsx global>{`

                    
                .glitch {
                    position: relative;
                    color: #fff;
                    white-space: nowrap;
                }
                
                .glitch::before,
                .glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    clip-path: inset(0 0 0 0);
                }

                .glitch::after {
                    left: 8px;
                    text-shadow: var(--after-shadow);
                    animation: animate-glitch 3s infinite linear alternate-reverse;
                }

                .glitch::before {
                    left: -8px;
                    text-shadow: var(--before-shadow);
                    animation: animate-glitch 2s infinite linear alternate-reverse;
                }

                @keyframes animate-glitch {
                    0%   { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); }
                    10%  { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); }
                    20%  { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); }
                    30%  { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); }
                    40%  { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); }
                    50%  { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); }
                    60%  { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); }
                    70%  { clip-path: polygon(0 65%, 100% 65%, 100% 75%, 0 75%); }
                    80%  { clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); }
                    90%  { clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%); }
                    100% { clip-path: polygon(0 35%, 100% 35%, 100% 45%, 0 45%); }
                }

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