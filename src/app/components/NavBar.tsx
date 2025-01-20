import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex items-center justify-between bg-[#1E1E2E] p-6 md:px-[100px]">
      <div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full w-1/5 bg-[#212121] overflow-y-auto p-6 z-50"
            >
              <button onClick={closeMenu} className="float-right text-lg text-white">
                X
              </button>
              <Link href="/">
                <p className="block mt-4 text-[#A78BFA] hover:text-white" onClick={closeMenu}>
                  Home
                </p>
              </Link>
              <Link href="/about">
                <p className="block mt-4 text-[#A78BFA] hover:text-white" onClick={closeMenu}>
                  About
                </p>
              </Link>
              <Link href="/contact">
                <p className="block mt-4 text-[#A78BFA] hover:text-white" onClick={closeMenu}>
                  Contact
                </p>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-[#A78BFA] border-[#4F46E5] hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <circle cx="5" cy="5" r="2" />
            <circle cx="10" cy="5" r="2" />
            <circle cx="15" cy="5" r="2" />
            <circle cx="5" cy="10" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="15" cy="10" r="2" />
            <circle cx="5" cy="15" r="2" />
            <circle cx="10" cy="15" r="2" />
            <circle cx="15" cy="15" r="2" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
