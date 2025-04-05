"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMenu } from "react-icons/fi";
import { FaGamepad } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/timeline", label: "Timeline" },
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 backdrop-blur-lg transition-colors duration-300 ${isScrolled
            ? "bg-orange-500/100 border-b border-orange-200 shadow-xl"
            : "bg-black/20 "
          }`}
      >
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Section - Logos */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <motion.img
                  src="/cselogo.png"
                  alt="CSE Logo"
                  className="w-14 h-14 rounded-full cursor-pointer bg-white hover:scale-105 transition-transform border-2 border-orange-200"
                  onClick={handleLogoClick}
                  whileHover={{ scale: 1.05 }}
                />
                <img
                  src="/CollegeLogo.png"
                  alt="College Logo"
                  className="h-12 w-auto hidden md:block cursor-pointer hover:scale-105 transition-transform"
                  onClick={handleLogoClick}
                />
              </div>
              <div className="h-12 w-px bg-orange-200/50 hidden md:block" />  
            </div>
            <Link
              href="/"
              className="text-3xl font-bold font-mono bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mx-4 hover:scale-105 transition-transform"
            >
              ADVAYA
            </Link>

            {/* Right Section - Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex gap-8 items-center">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative px-1 py-2 font-medium transition-colors ${pathname === link.href
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
                <button
                  onClick={() => router.push('/game')}
                  className="p-2 rounded-lg hover:bg-orange-500/30 transition-colors"
                >
                  <FaGamepad className="w-5 h-5 text-white" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/gettickets')}
                  className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium cursor-pointer hover:bg-orange-900 transition-colors shadow-lg"
                >
                  Get Tickets
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute w-full bg-orange-600/40 backdrop-blur-lg border-b border-orange-200"
            >
              <div className="px-4 py-4">
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block py-2.5 px-4 rounded-lg transition-colors ${pathname === link.href
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
                  <div className="flex justify-center gap-4 mb-4">
                    <button
                      onClick={() => router.push('/game')}
                      className="p-2 rounded-full hover:bg-orange-500/30 transition-colors"
                    >
                      <FaGamepad className="w-10 h-10 border p-2 rounded-full text-white cursor-pointer" />
                    </button>
                  </div>
                  <button
                    onClick={() => router.push('/gettickets')}
                    className="w-full bg-orange-600 text-white  py-2.5 rounded-full font-medium hover:bg-orange-700 transition-colors"
                  >
                    Get Tickets
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;