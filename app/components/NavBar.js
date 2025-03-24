"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMoon, FiSun, FiX, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/timeline", label: "Timeline" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-[100] transition-all"
      >
        Skip to content
      </a>

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 backdrop-blur-xl ${isScrolled
            ? "bg-white/20 dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-700/30 shadow-lg backdrop-filter backdrop-blur-lg"
            : "bg-white/10 dark:bg-gray-900/20 backdrop-filter backdrop-blur-md"
          }`}
        style={{
          boxShadow: isScrolled ? "0 10px 30px -10px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"
              >
                Advaya
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative px-2 py-1.5 font-medium transition-colors ${pathname === link.href
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                        }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                          layoutId="underline"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Additional Controls */}
              <div className="flex items-center space-x-4 ml-4">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/30 transition-colors"
                  aria-label="Search"
                >
                  <FiSearch className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/30 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <FiSun className="w-5 h-5 text-orange-400 dark:text-orange-300" />
                  ) : (
                    <FiMoon className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                  )}
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-black px-6 py-1.5 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
                >
                  Get Tickets
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/30 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4"
              >
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full px-4 py-2 rounded-lg bg-white/30 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-orange-500 backdrop-blur-md placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full w-full bg-white/70 dark:bg-gray-900/70 backdrop-filter backdrop-blur-lg border-b border-white/20 dark:border-gray-700/30 shadow-lg"
            >
              <div className="px-4 py-4">
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block py-2 px-3 rounded-lg transition-colors ${pathname === link.href
                            ? "bg-orange-100/80 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                            : "text-gray-700 hover:bg-white/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/20 dark:border-gray-700/30">
                  <button className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg cursor-pointer">
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
