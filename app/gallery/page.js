"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/components/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  "/gallery/img1.JPG",
  "/gallery/img2.JPG",
  "/gallery/img3.JPG",
  "/gallery/img4.JPG",
  "/gallery/img5.JPG",
  "/gallery/img6.JPG",
  "/gallery/img7.JPG",
  "/gallery/img8.JPG",
  "/gallery/img9.JPG",
  "/gallery/img10.JPG",
  "/gallery/img10.JPG",
  "/gallery/img10.JPG",
  // add as many as you want
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-950 text-white py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl mt-10 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-400 mb-16"
        >
          Glimpse of Advaya 2k24
        </motion.h1>

        {/* Image Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 max-w-7xl mx-auto">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="w-full overflow-hidden break-inside-avoid cursor-pointer rounded-xl shadow-lg group relative"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${idx + 1}`}
                width={600}
                height={800}
                className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              key="modal"
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Full Image"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
