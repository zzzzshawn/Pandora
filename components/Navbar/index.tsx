"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 1, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
      className="fixed top-6 left-0 right-0 bg-white backdrop-blur-xl backdrop-saturate-150 rounded-full flex items-center justify-between min-h-10 max-w-3xl max-sm:mx-5 sm:mx-10 md:mx-auto shadow-md z-[999] px-5 py-2"
    >
      <div className="flex items-center gap-2 h-full">
        <h2 className="text-[14px] text-black max-sm:text-[12px] font-bold font-glancyr700">
          Pandora
        </h2>
      </div>
      <Link href="/">
        <Button className="bg-black text-white w-max  gap-0.5 flex items-center justify-center rounded-full hover:bg-dark-4 ">
          <p className="font-glancyr">home</p>
          <ArrowTopRightIcon className="size-full" />
        </Button>
      </Link>
    </motion.nav>
  );
}
