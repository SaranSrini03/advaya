"use client"
// app/teams/page.js
import Image from "next/image";
import Noise from "@/app/animations/Noise";
import Navbar from "@/app/components/NavBar";
import { motion, stagger, useAnimate } from "framer-motion";

// ... (imports remain same)
const faculty = [
    { name: "Dr. Ancykutty", role: "Faculty Coordinator", image: "/team/ancykutty.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
  ];
  
  const students = [
    { name: "Raman Tulsankar", role: "Student Coordinator", image: "/team/raman.jpg" },
    { name: "Ramesh Jawalkar", role: "Student Coordinator", image: "/team/ramesh.jpg" },
    { name: "Ramesh Jawalkar", role: "Student Coordinator", image: "/team/ramesh.jpg" },
    { name: "Ramesh Jawalkar", role: "Student Coordinator", image: "/team/ramesh.jpg" },
    { name: "Ramesh Jawalkar", role: "Student Coordinator", image: "/team/ramesh.jpg" },
    { name: "Ramesh Jawalkar", role: "Student Coordinator", image: "/team/ramesh.jpg" },
    // ...add others here
  ];

const TeamCard = ({ name, role, image }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group relative bg-[#1e1e2f]/90 rounded-xl overflow-hidden shadow-2xl text-center text-white p-6 hover:bg-[#2a2a40]/90 transition-all duration-300 hover:-translate-y-2 hover:shadow-orange-900/30"
  >
    {/* Animated border */}
    <div className="absolute inset-0 rounded-xl border-1 border-orange-300/10 group-hover:border-orange-300/30 transition-all duration-500" />
    
    {/* Glow effect */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/20 via-transparent to-amber-400/20" />
    
    <div className="relative z-10">
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-orange-300/30 group-hover:border-amber-200/50 transition-all duration-300 shadow-[0_0_20px_rgba(255,140,0,0.1)]">
        <Image 
          src={image} 
          alt={name} 
          fill 
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff8800]/30 to-transparent" />
      </div>
      
      <h3 className="text-lg font-bold mb-1 glitch-parent hover:text-orange-300 transition-colors font-mono">
        <span className="glitch" data-text={name}>{name}</span>
      </h3>
      <p className="text-sm text-amber-300 font-mono bg-[#ffffff08] px-3 py-1 rounded-full inline-block">
        {role}
      </p>
    </div>

    {/* Animated background dots */}
    <div className="absolute inset-0 opacity-20">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-orange-300 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  </motion.div>
);

export default function TeamsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00] py-16 px-4 text-center">
      <Noise />
      <Navbar />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-15">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-16 glitch-parent mt-6"
        data-text="Organizing Committee"
      >
        <span className="glitch px-4" data-text="Organizing Committee">
          Organizing Committee
        </span>
      </motion.h1>

      <section className="mb-20 max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl text-amber-200 font-mono mb-12 glitch-parent border-b border-orange-300/20 pb-4 inline-block"
        >
          <span className="glitch" data-text="Faculty Coordinators">
            Faculty Coordinators
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {faculty.map((person, idx) => (
            <TeamCard key={idx} {...person} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl text-amber-200 font-mono mb-12 glitch-parent border-b border-orange-300/20 pb-4 inline-block"
        >
          <span className="glitch" data-text="Student Coordinators">
            Student Coordinators
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {students.map((person, idx) => (
            <TeamCard key={idx} {...person} />
          ))}
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        .glitch-parent {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }
        
        .glitch {
          position: relative;
          display: inline-block;
          padding: 0 0.25em;
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
          opacity: 0;
          transition: opacity 0.3s;
          mix-blend-mode: hard-light;
        }

        .glitch-parent:hover .glitch::before,
        .glitch-parent:hover .glitch::after {
          opacity: 0.4;
        }

        .glitch::before {
          left: 4px;
          text-shadow: -3px 0 #ff6600;
          animation: glitch-1 1.5s infinite linear alternate-reverse;
        }

        .glitch::after {
          left: -4px;
          text-shadow: 3px 0 #ffcc00;
          animation: glitch-2 1.5s infinite linear alternate-reverse;
        }

        @keyframes glitch-1 {
          0% { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); }
          20% { clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); }
          40% { clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); }
          60% { clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%); }
          80% { clip-path: polygon(0 65%, 100% 65%, 100% 75%, 0 75%); }
          100% { clip-path: polygon(0 35%, 100% 35%, 100% 45%, 0 45%); }
        }

        @keyframes glitch-2 {
          0% { clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%); }
          20% { clip-path: polygon(0 55%, 100% 55%, 100% 65%, 0 65%); }
          40% { clip-path: polygon(0 85%, 100% 85%, 100% 95%, 0 95%); }
          60% { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); }
          80% { clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); }
          100% { clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); }
        }
      `}</style>
    </div>
  );
}