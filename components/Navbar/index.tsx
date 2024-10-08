"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  
  return (
    <motion.nav
      initial={{ opacity: 1, y: -100 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.8,  delay: 0  }}
      className="fixed top-6 left-0 right-0 bg-white backdrop-blur-xl backdrop-saturate-150 rounded-full flex items-center justify-between min-h-10 max-w-3xl max-sm:mx-5 sm:mx-10 md:mx-auto shadow-md z-[999] px-5 py-2"
    >
      <div className="flex items-center gap-2 h-full">
        <h2 className="text-[14px] text-black max-sm:text-[12px] font-bold font-glancyr700">Pandora</h2>
      </div>
    </motion.nav>
  );
}
