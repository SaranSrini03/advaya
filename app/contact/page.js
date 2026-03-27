"use client"
import { useEffect, useState } from 'react';
import Navbar from "@/app/components/NavBar";
import { FaDiscord, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
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
      handle: "@advaya2k26", 
      icon: <FaInstagram className="text-2xl"/>, 
      action: () => window.open("https://www.instagram.com/advaya2k26", "_blank") 
    },
    { 
      platform: "Discord", 
      handle: "advaya2k26", 
      icon: <FaDiscord className="text-2xl"/>, 
      action: () => window.open("https://discord.com/channels/1347084703588552806/1347084703588552809", "_blank") 
    },
  ];

  // Animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowContacts(true), 500);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-shell relative w-full min-h-screen overflow-hidden text-[color:var(--foreground)]">
      <Navbar />

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Animated title */}
        <div className={`w-full transition-all duration-1000 ${moved ? 'pt-20 md:pt-24' : 'absolute top-1/2 -translate-y-1/2'}`}>
          <span className="title-min font-black font-mono block text-center mx-auto text-5xl md:text-6xl">
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
                    className="section-card p-4 md:p-6 rounded-xl hover:border-[color:var(--accent)] transition-all duration-300 hover:scale-[1.01] animate-fade-in-up cursor-pointer group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        {contact.icon}
                      </span>
                      <div className="text-left">
                        <h3 className="text-lg md:text-xl font-mono text-emerald-300 group-hover:text-emerald-200 transition-colors">
                          {contact.platform}
                        </h3>
                        <p className="font-mono text-sm md:text-base text-emerald-200 group-hover:text-emerald-100 transition-colors">
                          {contact.handle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Additional contact info */}
              <div className="section-card mt-8 rounded-xl p-6 animate-fade-in">
                <h3 className="text-lg font-mono text-emerald-300 mb-2">College Address</h3>
                <p className="font-mono text-emerald-200">
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