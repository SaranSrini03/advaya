"use client"
import { useEffect, useRef, useState } from 'react';
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";
import { FaDiscord, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function ContactPage() {
  const [dots, setDots] = useState([]);
  const blobRef = useRef(null);
  const [moved, setMoved] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const contacts = [
    { 
      platform: "Email", 
      handle: "advaya@sairamce.edu.in", 
      icon: <FaEnvelope className="text-2xl"/>, 
      action: () => window.location.href = "mailto:advaya@sairamce.edu.in" 
    },
    { 
      platform: "WhatsApp", 
      handle: "+91 8072872929", 
      icon: <FaWhatsapp className="text-2xl"/>, 
      action: () => window.open("https://wa.me/918072872929", "_blank") 
    },
    { 
      platform: "Instagram", 
      handle: "@advaya2k25", 
      icon: <FaInstagram className="text-2xl"/>, 
      action: () => window.open("https://www.instagram.com/advaya2k25", "_blank") 
    },
    { 
      platform: "Discord", 
      handle: "advaya2k25", 
      icon: <FaDiscord className="text-2xl"/>, 
      action: () => window.open("https://discord.com/channels/1347084703588552806/1347084703588552809", "_blank") 
    },
  ];

  // Background dots effect
  useEffect(() => {
    setDots(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  // Mouse blob effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return;
      const { clientX, clientY } = e;
      blobRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowContacts(true), 500);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00]">
      <Navbar />
      <Noise />

      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-20">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-300 rounded-full animate-pulse"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Follower gradient blob */}
      <div
        ref={blobRef}
        className="absolute w-40 h-40 md:w-64 md:h-64 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Animated title */}
        <div className={`w-full transition-all duration-1000 ${moved ? 'pt-20 md:pt-24' : 'absolute top-1/2 -translate-y-1/2'}`}>
          <span
            className="glitch font-black font-mono block text-center mx-auto"
            data-text="Contact"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              "--after-shadow": "-8px 0 #ff6600",
              "--before-shadow": "8px 0 #ffcc00",
              textShadow: '0 0 10px rgba(255,140,0,0.5)'
            }}
          >
            Contact
          </span>
        </div>

        {/* Contact cards */}
        {showContacts && (
          <div className="flex-1 flex items-center justify-center py-8 md:py-12 animate-fade-in">
            <div className="w-full max-w-4xl px-4 md:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {contacts.map((contact, index) => (
                  <button
                    key={index}
                    onClick={contact.action}
                    className="bg-black/40 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-orange-300/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up cursor-pointer group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-orange-400 group-hover:text-orange-300 transition-colors">
                        {contact.icon}
                      </span>
                      <div className="text-left">
                        <h3 className="text-lg md:text-xl font-mono text-orange-300 group-hover:text-orange-200 transition-colors">
                          {contact.platform}
                        </h3>
                        <p className="font-mono text-sm md:text-base text-orange-200 group-hover:text-orange-100 transition-colors">
                          {contact.handle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Additional contact info */}
              <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-orange-300/20 animate-fade-in">
                <h3 className="text-lg font-mono text-orange-300 mb-2">College Address</h3>
                <p className="font-mono text-orange-200">
                  Sri Sairam Engineering College<br />
                  Anekal, Bengaluru<br />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

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
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}