"use client"
// app/teams/page.js
import Image from "next/image";
import Navbar from "@/app/components/NavBar";
import { motion, stagger, useAnimate } from "framer-motion";

const HOD = [
    { name: "Dr. Smitha .JA", role: "HOD", image: "/teams/Hod.jpeg" },

];
const faculty = [
    { name: "Dr. Ancykutty", role: "Faculty Coordinator", image: "/team/ancykutty.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
    { name: "Dr. Rajesh", role: "Faculty Coordinator", image: "/team/rajesh.jpg" },
];

const students = [
    { name: "Saran Srini V", role: "Student Coordinator", image: "/teams/saran.jpeg" },
    { name: "TejaShree K", role: "Student Coordinator", image: "/teams/teja.jpeg" },
    { name: "Thanuj", role: "Student Coordinator", image: "/teams/thanuj.jpeg" },
    { name: "Yogesh D", role: "Student Coordinator", image: "/teams/yogi.jpeg" },
    { name: "Sedhuraman", role: "Student Coordinator", image: "/teams/Sedhu.jpeg" },
    { name: "Ayush Chand D", role: "Student Coordinator", image: "/teams/ayush.jpg" },
    // ...add others here
];

const TeamCard = ({ name, role, image }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.06, rotateZ: Math.random() * 3 - 1.5 }}
        whileTap={{ scale: 0.98 }}
        transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 120
        }}
        className="group relative bg-[linear-gradient(160deg,#3a1000_20%,#6a2200)] rounded-3xl overflow-hidden shadow-2xl text-center text-white p-12 hover:shadow-[0_0_50px_-15px_rgba(255,140,0,0.4)] w-[380px] h-[580px]"
    >
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,#ff660025_0%,transparent_70%)]" />

        {/* Animated floating particles */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        x: Math.random() * 120 - 60,
                        y: Math.random() * 120 - 60
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>

        {/* Hover border animation */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border-[1px] border-orange-300/15 group-hover:border-orange-300/40 transition-all duration-500" />
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_180deg_at_50%_50%,#ff8c0040_0deg,#ff8c0000_180deg)] animate-rotate" />
        </div>

        <div className="relative z-10 space-y-8 flex flex-col items-center justify-center h-full">
            {/* Larger image container */}
            <motion.div
                className="relative w-72 h-72 mx-auto rounded-2xl overflow-hidden border-3 border-orange-300/20 group-hover:border-amber-200/60 transition-all duration-300 shadow-[0_0_30px_rgba(255,140,0,0.3)]"
                whileHover={{ scale: 1.08, rotate: 3 }}
            >
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 ease-out-expo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#ff8800]/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#000000a0)]" />
            </motion.div>

            {/* Enlarged text elements */}
            <motion.h3
                className="text-3xl font-bold glitch-parent hover:text-orange-300 font-mono px-4"
                whileHover={{ textShadow: "0 0 25px rgba(255,140,0,0.7)" }}
            >
                <span
                    className="glitch inline-block px-4 py-2 hover:bg-orange-900/30 rounded-xl transition-all"
                    data-text={name}
                    style={{
                        '--glitch-offset': '3px',
                        '--glitch-color-1': '#ff6600',
                        '--glitch-color-2': '#ffcc00'
                    }}
                >
                    {name}
                </span>
            </motion.h3>

            {/* Larger role badge */}
            <motion.p
                className="text-lg text-amber-300 font-mono px-6 py-3 rounded-full inline-block bg-[linear-gradient(45deg,#7a2e00_25%,#9a3e00)] backdrop-blur-md border-2 border-orange-300/25 group-hover:border-amber-200/50 relative overflow-hidden"
                whileHover={{ scale: 1.08 }}
            >
                <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L3 9v12h18V9l-9-7zm0 2.45l7 5.5V20H5v-10.05l7-5.5zM12 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                    </svg>
                    {role}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[linear-gradient(45deg,transparent_25%,#ff8c0030_50%,transparent_75%)] bg-[length:400%_400%] animate-shine" />
            </motion.p>
        </div>

        {/* Enhanced hover shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x)_var(--y),#ff8c00_0%,transparent_60%)]" />
    </motion.div>
);

export default function TeamsPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00] py-16 px-4 text-center">
            <Navbar />



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

            <section className="mb-24 md:mb-32 max-w-8xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl md:text-3xl text-amber-200 font-mono mb-12 md:mb-16 glitch-parent border-b border-orange-300/20 pb-4 md:pb-6 inline-block"
                >
                    Faculty Coordinators
                </motion.h2>
                <div className="grid grid-cols-1 justify-items-center"> {/* Changed grid setup */}
                    {HOD.map((person, idx) => (
                        <div key={idx} className="w-full max-w-[380px] px-2 sm:px-0">
                            <TeamCard {...person} />
                        </div>
                    ))}
                </div>
            </section>
            <section className="mb-24 md:mb-32 max-w-8xl">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl md:text-3xl text-amber-200 font-mono mb-12 md:mb-16 glitch-parent border-b border-orange-300/20 pb-4 md:pb-6 inline-block"
                >
                    Faculty Coordinators
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-3 lg:gap-6">
                    {faculty.map((person, idx) => (
                        <div key={idx} className="px-2 sm:px-0">
                            <TeamCard {...person} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-24 md:mb-32 max-w-8xl">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl md:text-3xl text-amber-200 font-mono mb-12 md:mb-16 glitch-parent border-b border-orange-300/20 pb-4 md:pb-6 inline-block"
                >
                    Student Coordinators
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-3 lg:gap-6">
                    {students.map((person, idx) => (
                        <div key={idx} className="px-2 sm:px-0">
                            <TeamCard {...person} />
                        </div>
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