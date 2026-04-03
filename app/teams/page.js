"use client";
// app/teams/page.js
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/app/components/NavBar";
import { motion } from "framer-motion";
import {
  defaultStudentCoordinatorNames,
  sanitizeStudentCoordinatorNames,
} from "@/app/lib/studentCoordinatorRoster";

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

const studentImageByName = {
  Naveen: "/teams/naveen2.jpeg",
  Saran: "/teams/saran.jpeg",
  "Guru Prasath": "/teams/guru2.jpeg",
  Neha: "/teams/neha25.jpeg",
  Tejashree: "/teams/teja2.jpeg",
  "Yashwanth V": "/teams/yashwanthV.jpeg",
  "Yashwanth K": "/teams/yeshwanthK.jpg",
  Niveditha: "/teams/nivedita.jpeg",
  "Nitharsan Babu V": "/teams/Babu.jpeg",
  "Thiru Maran": "/teams/thiru.jpg",
};

const fallbackStudentImages = [
  "/teams/channavera1.png",
  "/teams/pushkala.jpg",
  "/teams/madhu2.jpg",
  "/teams/mouni.jpeg",
  "/teams/ayush.jpeg",
  "/teams/kowshika.jpeg",
  "/teams/namitha.jpeg",
  "/teams/mounasri.jpeg",
  "/teams/Sedhu.jpeg",
  "/teams/roshan1.jpeg",
  "/teams/sunil.jpeg",
  "/teams/sidram2.png",
  "/teams/sanjai.jpeg",
  "/teams/Sarathi.jpeg",
  "/teams/thanuj3.jpeg",
  "/teams/yogi.jpeg",
  "/teams/vinay.jpeg",
  "/teams/santhosh.jpeg",
  "/teams/pallavi.jpeg",
  "/teams/navya.jpeg",
  "/teams/priya.jpeg",
];

function imageForStudent(name, index) {
  const mapped = studentImageByName[name];
  if (mapped) return mapped;
  return fallbackStudentImages[index % fallbackStudentImages.length];
}

const TeamCard = ({ name, role, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    transition={{
      duration: 0.4,
      type: "spring",
      stiffness: 150,
    }}
    className="group section-card relative rounded-2xl overflow-hidden text-[color:var(--foreground)] w-full h-full max-w-xs mx-auto flex flex-col"
  >
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

      </div>

      {/* Name with animated underline */}
      <h3 className="text-lg font-semibold text-[color:var(--foreground)] transition-colors duration-300 text-center px-2">
        {name}
      </h3>

      {/* Role with animated badge */}
      <div className="mt-auto">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-[color:var(--surface-muted)] border border-[color:var(--surface-border)] transition-all duration-500"
        >
          <svg
            className="w-4 h-4 text-[color:var(--accent)] mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L3 9v12h18V9l-9-7zm0 2.45l7 5.5V20H5v-10.05l7-5.5zM12 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
          <span className="text-sm font-medium text-[color:var(--muted-text)]">{role}</span>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

export default function TeamsPage() {
  const [rosterNames, setRosterNames] = useState(() => defaultStudentCoordinatorNames());

  useEffect(() => {
    let cancelled = false;
    fetch("/api/team-roster")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data?.names || !Array.isArray(data.names)) return;
        setRosterNames(sanitizeStudentCoordinatorNames(data.names));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const bc = new BroadcastChannel("advaya-site-settings");
    const onMsg = (ev) => {
      if (ev?.data?.type !== "team-roster") return;
      fetch("/api/team-roster")
        .then((r) => r.json())
        .then((data) => {
          if (data?.names && Array.isArray(data.names)) {
            setRosterNames(sanitizeStudentCoordinatorNames(data.names));
          }
        })
        .catch(() => {});
    };
    bc.addEventListener("message", onMsg);
    return () => {
      bc.removeEventListener("message", onMsg);
      bc.close();
    };
  }, []);

  const students = useMemo(
    () =>
      rosterNames.map((name, idx) => ({
        name,
        role: "Student Coordinator",
        image: imageForStudent(name, idx),
      })),
    [rosterNames]
  );

  return (
    <div>
      <Navbar />
      <div className="page-shell min-h-screen relative overflow-hidden py-12 px-4 text-center text-[color:var(--foreground)]">

        {/* Title with motion */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="title-min text-4xl mt-20 md:text-5xl font-bold mb-16 relative z-10"
        >
          Organizing Committee
        </motion.h1>

        <section className="mb-20 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-lime-200 font-medium mb-10 pb-2 border-b border-lime-700/40 inline-block"
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
            className="text-2xl text-lime-200 font-medium mb-10 pb-2 border-b border-lime-700/40 inline-block"
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
            className="text-2xl text-lime-200 font-medium mb-10 pb-2 border-b border-lime-700/40 inline-block"
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
            className="text-2xl text-lime-200 font-medium mb-10 pb-2 border-b border-lime-700/40 inline-block"
          >
            Student Coordinators
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {students.map((person, idx) => (
              <div key={`${idx}-${person.name}`} className="w-full max-w-xs">
                <TeamCard {...person} />
              </div>
            ))}
          </div>
        </section>

        {/* Added decorative elements */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-lime-900/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-lime-900/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}