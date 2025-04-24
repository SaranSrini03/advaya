"use client";
// app/teams/page.js
import Image from "next/image";
import Navbar from "@/app/components/NavBar";
import { motion, stagger, useAnimate } from "framer-motion";

const coop = [
  { name: "Dr. ArunKumar R", role: "COO", image: "/teams/coo.jpeg" },
  
  { name: "Dr. B Shadakshrappa", role: "Principal", image: "/teams/principal.jpeg" }
];
const HOD = [{ name: "Dr. Smitha .JA", role: "HOD", image: "/teams/Hod.jpeg" }];
const faculty = [
  {
    name: "Prof. Valarmathi",
    role: "Faculty Coordinator",
    image: "/teams/valarmathi.jpeg",
  },
  {
    name: "Prof. Nithyakalyani",
    role: "Faculty Coordinator",
    image: "/teams/nithyamam.jpeg",
  },
];

const students = [
  { name: "Channaveera", role: "Student Coordinator", image: "/teams/channavera1.png" },
  { name: "Pushkala B", role: "Student Coordinator", image: "/teams/pushkala.jpg" },
  { name: "Madhumitha Prabhakaran", role: "Student Coordinator", image: "/teams/madhu2.jpg" },
  { name: "Mounicca Rameshbabu", role: "Student Coordinator", image: "/teams/mouni.jpeg" },
  { name: "Saran Srini V", role: "Student Coordinator", image: "/teams/saran.jpeg" },
  { name: "Tejashree K", role: "Student Coordinator", image: "/teams/teja2.jpeg" },
  { name: "Naveen Rajan M", role: "Student Coordinator", image: "/teams/naveen2.jpeg" },
  { name: "Guruprasath M", role: "Student Coordinator", image: "/teams/gurubhai2.jpeg" },
  { name: "Ayush Chand D", role: "Student Coordinator", image: "/teams/ayush.jpeg" },
  { name: "Neha S", role: "Student Coordinator", image: "/teams/neha25.jpeg" },
  { name: "Kowshika V", role: "Student Coordinator", image: "/teams/kowshika.jpeg" },
  { name: "Namita R", role: "Student Coordinator", image: "/teams/namitha.jpeg" },
  { name: "Mounasri V", role: "Student Coordinator", image: "/teams/mounasri.jpeg" },
  { name: "Sedhuraman", role: "Student Coordinator", image: "/teams/Sedhu.jpeg" },
  { name: "Roshan", role: "Student Coordinator", image: "/teams/roshan1.jpeg" },
  { name: "Sidram S", role: "Student Coordinator", image: "/teams/sidram2.png" },
  { name: "Sanjay", role: "Student Coordinator", image: "/teams/sanjai.jpeg" },
  { name: "Sarathi V", role: "Student Coordinator", image: "/teams/Sarathi.jpeg" },
  { name: "Nitharsin Babu", role: "Student Coordinator", image: "/teams/Babu.jpeg" },
  { name: "Yashwanth V", role: "Student Coordinator", image: "/teams/yashwanthV.jpeg" },
  { name: "Yeshwanth K", role: "Student Coordinator", image: "/teams/yeshwanthK.jpg" },
  { name: "Niveditha Y", role: "Student Coordinator", image: "/teams/nivedita.jpeg" },
  { name: "Thanuj V", role: "Student Coordinator", image: "/teams/thanuj3.jpeg" },
  { name: "Yogesh D", role: "Student Coordinator", image: "/teams/yogi.jpeg" },
  { name: "Vinay", role: "Student Coordinator", image: "/teams/vinay.jpeg" },
  { name: "Santhosh M", role: "Student Coordinator", image: "/teams/santhosh.jpeg" },
  { name: "Pallavi", role: "Student Coordinator", image: "/teams/pallavi.jpeg" },
  { name: "Navya Nayak", role: "Student Coordinator", image: "/teams/navya.jpeg" },
  { name: "Priya Varshini", role: "Student Coordinator", image: "/teams/priya.jpeg" },
];

const TeamCard = ({ name, role, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 0 30px rgba(255, 140, 0, 0.5)",
      y: -5
    }}
    transition={{
      duration: 0.4,
      type: "spring",
      stiffness: 150,
    }}
    className="group relative rounded-2xl overflow-hidden shadow-xl text-white w-full h-full max-w-xs mx-auto flex flex-col bg-gradient-to-b from-amber-900/80 to-orange-950/90 backdrop-blur-sm border border-amber-700/30"
  >
    {/* Hover effects */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-r from-orange-600/20 to-amber-600/20 z-0" />
    <div className="absolute -inset-1 opacity-0 group-hover:opacity-30 scale-105 blur-xl transition-all duration-700 z-0 bg-gradient-to-r from-orange-400 to-amber-300" />

    {/* Animated corner accents */}
    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-400/40 group-hover:border-amber-300 transition-all duration-500 z-10" />
    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-400/40 group-hover:border-amber-300 transition-all duration-500 z-10" />

    {/* Main content */}
    <div className="relative z-10 p-4 flex flex-col items-center space-y-5 h-full">
      {/* Image with animated gradient overlay */}
      <div className="group relative w-full pt-[100%] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover object-center absolute inset-0 transition-all duration-700 group-hover:scale-110 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

        {/* Animated overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-orange-900/70 to-transparent z-20" />
      </div>

      {/* Name with animated underline */}
      <h3 className="text-xl font-bold text-amber-200 relative group-hover:text-amber-100 transition-colors duration-300 text-center px-2">
        {name}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-500" />
      </h3>

      {/* Role with animated badge */}
      <div className="mt-auto">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-amber-700/70 to-orange-800/70 border border-amber-500/30 group-hover:border-amber-400/80 transition-all duration-500"
        >
          <svg
            className="w-4 h-4 text-amber-300 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L3 9v12h18V9l-9-7zm0 2.45l7 5.5V20H5v-10.05l7-5.5zM12 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
          <span className="text-sm font-medium text-amber-200">{role}</span>
        </motion.div>
      </div>
    </div>

    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
  </motion.div>
);

export default function TeamsPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-orange-950 to-amber-950 py-12 px-4 text-center">
        {/* Background glow elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Title with motion */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl mt-20 md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 mb-16 relative z-10"
        >
          Organizing Committee
        </motion.h1>

        <section className="mb-20 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-amber-200 font-medium mb-10 pb-2 border-b border-amber-700/40 inline-block"
          >
            
          </motion.h2>

          <div className="flex justify-center gap-8 flex-wrap">
            {coop.map((person, idx) => (
              <div key={idx} className="w-full max-w-xs">
                <TeamCard {...person} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-amber-200 font-medium mb-10 pb-2 border-b border-amber-700/40 inline-block"
          >
            Head Of Department
          </motion.h2>

          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <TeamCard {...HOD[0]} />
            </div>
          </div>
        </section>

        {/* Faculty Section - Centered */}
        <section className="mb-20 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-amber-200 font-medium mb-10 pb-2 border-b border-amber-700/40 inline-block"
          >
            Faculty Coordinators
          </motion.h2>

          <div className="flex justify-center gap-8 flex-wrap">
            {faculty.map((person, idx) => (
              <div key={idx} className="w-full max-w-xs">
                <TeamCard {...person} />
              </div>
            ))}
          </div>
        </section>

        {/* Student Coordinators */}
        <section className="mb-20 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-amber-200 font-medium mb-10 pb-2 border-b border-amber-700/40 inline-block"
          >
            Student Coordinators
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {students.map((person, idx) => (
              <div key={idx} className="w-full max-w-xs">
                <TeamCard {...person} />
              </div>
            ))}
          </div>
        </section>

        {/* Added decorative elements */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-amber-900/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-amber-900/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}