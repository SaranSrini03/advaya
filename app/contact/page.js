"use client"
import { useEffect, useRef, useState } from 'react';
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";

export default function HomePage() {
  const [dots, setDots] = useState([]);
  const blobRef = useRef(null);
  const [moved, setMoved] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const contacts = [
    { platform: "Email", handle: "contact@advayathon.com", icon: "✉️" },
    { platform: "WhatsApp", handle: "+1 555 123 4567", icon: "📱" },
    { platform: "Instagram", handle: "@advayathon", icon: "📸" },
    { platform: "Discord", handle: "discord.gg/advayathon", icon: "🎮" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowContacts(true), 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Keep existing mouse and dots effects

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00]">
      <Navbar />
      <Noise />

      {/* Existing background elements and blob */}

      <div className="relative z-10 h-full text-white">
        {/* Animated title */}
        <div className={`absolute w-full transition-all duration-1000 ${moved ? 'top-8' : 'top-1/2 -translate-y-1/2'}`}>
          <span
            className="glitch font-black mt-20 sm:mt-20 font-mono block text-center mx-auto"
            data-text="Contact"
            style={{
              fontSize: "clamp(3rem, 8vw, 10rem)",
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
          <div className="pt-40 h-full flex items-center justify-center animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-4xl w-full">
              {contacts.map((contact, index) => (
                <div 
                  key={index}
                  className="bg-black/40 backdrop-blur-lg p-6 rounded-xl border border-orange-300/20 hover:border-orange-500/50 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{contact.icon}</span>
                    <div>
                      <h3 className="text-xl font-mono text-orange-300">
                        {contact.platform}
                      </h3>
                      <p className="font-mono text-orange-200">
                        {contact.handle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}