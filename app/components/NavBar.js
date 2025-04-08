"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMenu, FiGlobe } from "react-icons/fi";
import {
  FaDiscord,
  FaDownload,
  FaGamepad,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Socials from "./Socials.json";
import { RiDownload2Line, RiDownloadCloud2Line } from 'react-icons/ri';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [whatsappOptions, setWhatsappOptions] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const Handlesocials = (type) => {
    switch (type) {
      case "discord":
        window.open(
          "https://discord.com/channels/1347084703588552806/1347084703588552809",
          "_blank"
        );
        break;
      case "whatsapp":
        setWhatsappOptions(true);
        break;
      case "instagram":
        window.open(
          "https://www.instagram.com/advaya2k25?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
          "_blank"
        );
        break;

      case "download":
        const link = document.createElement("a");
        link.href = "/agenda.pdf";
        link.download = "ADVAYA_AGENDA.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
    }
    setShowSocials(false);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/timeline", label: "Timeline" },
    { href: "/teams", label: "Teams" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => router.push("/");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-orange-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-[100]"
      >
        Skip to content
      </a>

      <motion.nav
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 backdrop-blur-lg transition-colors duration-300 ${
          isScrolled
            ? "bg-orange-600/10 border-b border-orange-200 shadow-xl"
            : "bg-black/20"
        }`}
      >
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 md:gap-4">
                <motion.img
                  src="/cselogo.png"
                  alt="CSE Logo"
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full cursor-pointer bg-white hover:scale-105 transition-transform border-2 border-orange-200"
                  onClick={handleLogoClick}
                  whileHover={{ scale: 1.05 }}
                />
                <img
                  src="/CollegeLogo.png"
                  alt="College Logo"
                  className="h-10 w-auto hidden md:block cursor-pointer hover:scale-105 transition-transform"
                  onClick={handleLogoClick}
                />
              </div>
              <div className="h-8 md:h-12 w-px bg-orange-200/50 hidden md:block" />
            </div>

            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold font-mono bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mx-2 md:mx-4 hover:scale-105 transition-transform"
            >
              ADVAYA
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <ul className="flex gap-4 lg:gap-8 items-center">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative px-1 py-2 font-medium transition-colors ${
                        pathname === link.href
                          ? "text-white"
                          : "text-orange-100 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                          layoutId="nav-underline"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => router.push("/game")}
                    className="p-2 rounded-lg hover:bg-orange-500/30 transition-colors"
                  >
                    <FaGamepad className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => Handlesocials("download")}
                    className="p-2 rounded-lg hover:bg-orange-500/30 transition-colors relative group"
                  >
                    <RiDownloadCloud2Line className="w-5 h-5 text-white" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      agenda
                    </span>
                  </button>
                  <button
                    onClick={() => setShowSocials(!showSocials)}
                    className="p-2 rounded-lg hover:bg-orange-500/30 transition-colors relative group"
                  >
                    <FiGlobe className="w-5 h-5 text-white" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      Socials
                    </span>
                  </button>

                  <AnimatePresence>
                    {showSocials && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-lg rounded-lg p-2 shadow-xl"
                      >
                        <div className="flex flex-col gap-2">
                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => Handlesocials("discord")}
                            className="p-2 rounded-lg hover:bg-orange-500/30 transition-colors flex items-center gap-2 w-full"
                          >
                            <FaDiscord className="w-5 h-5 text-white" />
                            <span className="text-white text-sm">Discord</span>
                          </motion.button>

                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            onClick={() => Handlesocials("whatsapp")}
                            className="p-2 rounded-lg hover:bg-orange-500/30 transition-colors flex items-center gap-2 w-full"
                          >
                            <FaWhatsapp className="w-5 h-5 text-white" />
                            <span className="text-white text-sm">WhatsApp</span>
                          </motion.button>

                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => Handlesocials("instagram")}
                            className="p-2 rounded-lg hover:bg-orange-500/30 transition-colors flex items-center gap-2 w-full"
                          >
                            <FaInstagram className="w-5 h-5 text-white" />
                            <span className="text-white text-sm">
                              Instagram
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/gettickets")}
                  className="bg-orange-600 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-medium cursor-pointer hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Get Tickets
                </motion.button>
              </div>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-orange-500/30 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 text-white" />
              ) : (
                <FiMenu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute w-full bg-black/95 backdrop-blur-lg border-b border-orange-200"
            >
              <div className="px-4 py-4">
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block py-3 px-4 rounded-lg transition-colors text-lg ${
                          pathname === link.href
                            ? "bg-orange-400/90 text-white"
                            : "text-white hover:bg-orange-500/50"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-orange-200">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <button
                      onClick={() => router.push("/game")}
                      className="p-2 rounded-full hover:bg-orange-500/30 transition-colors"
                    >
                      <FaGamepad className="w-10 h-10 border p-2 rounded-full text-white cursor-pointer" />
                    </button>
                    <button
                      onClick={() => Handlesocials("whatsapp")}
                      className="p-2 rounded-full hover:bg-orange-500/30 transition-colors"
                    >
                      <FaWhatsapp className="w-10 h-10 border p-2 rounded-full text-white cursor-pointer" />
                    </button>
                    <button
                      onClick={() => Handlesocials("discord")}
                      className="p-2 rounded-full hover:bg-orange-500/30 transition-colors"
                    >
                      <FaDiscord className="w-10 h-10 border p-2 rounded-full text-white cursor-pointer" />
                    </button>
                    <button
                      onClick={() => Handlesocials("instagram")}
                      className="p-2 rounded-full hover:bg-orange-500/30 transition-colors"
                    >
                      <FaInstagram className="w-10 h-10 border p-2 rounded-full text-white cursor-pointer" />
                    </button>
                    <button
                      onClick={() => Handlesocials("download")}
                      className="p-2 rounded-full hover:bg-orange-500/30 transition-colors"
                    >
                      <FaDownload className="w-10 h-10 border p-2 rounded-full text-white cursor-pointer" />
                    </button>
                  </div>
                  <button
                    onClick={() => router.push("/gettickets")}
                    className="w-full bg-orange-600 text-white py-3 rounded-full font-medium hover:bg-orange-700 transition-colors text-lg"
                  >
                    Get Tickets
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {whatsappOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center"
            onClick={() => setWhatsappOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-orange-100/90 backdrop-blur-lg rounded-xl p-6 max-w-xs md:max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setWhatsappOptions(false)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-orange-200/50 transition-colors"
              >
                <FiX className="w-5 h-5 text-orange-900" />
              </button>

              <h3 className="text-orange-900 text-xl font-bold mb-4">
                Join WhatsApp Group
              </h3>

              <div className="space-y-2">
                {Socials.map((group, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 text-orange-900 font-medium group relative overflow-hidden"
                    >
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative z-10 block"
                      >
                        {group.name}
                      </motion.span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
