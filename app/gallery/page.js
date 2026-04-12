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
  "/gallery/img11.jpg",
  "/gallery/img12.jpg",
  "/gallery/img13.jpg",
  "/gallery/img14.jpg",
  "/gallery/img15.jpg",
  "/gallery/img16.jpg",
  "/gallery/img17.jpg",
  "/gallery/img18.JPG",
  "/gallery/img19.JPG",
  "/gallery/img20.JPG",
  "/gallery/img21.jpg",
  "/gallery/img22.jpg",
  "/gallery/img23.jpg",
  // add as many as you want
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="page-shell min-h-screen text-[color:var(--foreground)] py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="title-min text-4xl md:text-5xl mt-10 font-bold text-center mb-16"
        >
          Glimpse of Advaya 2k25  
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
              className="w-full overflow-hidden break-inside-avoid cursor-pointer rounded-xl group relative section-card"
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
              <div className="absolute inset-0 rounded-xl bg-[color:var(--surface-muted)] opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              key="modal"
              className="fixed inset-0 bg-[color:rgba(0,0,0,0.75)] backdrop-blur-md z-50 flex items-center justify-center p-4"
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
                  className="absolute top-4 right-4 bg-[color:rgba(0,0,0,0.6)] text-[color:var(--foreground)] p-2 rounded-full hover:bg-[color:rgba(0,0,0,0.8)] transition"
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
