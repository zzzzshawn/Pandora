"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import HalfCircleGradient from "./HalfCircleGradient";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full  flex flex-col items-center justify-center lg:py-[10%] py-[20%] text-white h-screen">
      <HalfCircleGradient position="bottom" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl max-sm:h-[85vh] flex flex-col items-center justify-center gap-1 max-sm:gap-0 max-sm:px-3"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0 }}
          className="w-full max-w-lg"
        >
          <h1 className="text-center text-[7rem] font-glancyr700 leading-[5rem] max-sm:text-[12px]">
            Pandora
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-lg"
        >
          <p className="text-center font-glancyr max-sm:text-[12px] text-[1.5rem] leading-tight">
            Your Gateway to Effortless Wallet Creation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="w-full max-w-lg"
        >
          <p className="text-center font-glancyr max-sm:text-[12px] mt-3">
            Get started with:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full flex items-center justify-center gap-3 mt-2"
        >
          <Link href={`/solwallet`}>
            <Button className="bg-white text-black w-max max-sm:hidden gap-0.5 flex items-center justify-center rounded-full hover:bg-black hover:text-white">
              <p className="font-glancyr">Solana</p>
              <ArrowTopRightIcon className="size-full" />
            </Button>
          </Link>
          <Link href={`/ethwallet`}>
            <Button className="bg-white text-black w-max max-sm:hidden gap-0.5 flex items-center justify-center rounded-full hover:bg-black hover:text-white">
              <p className="font-glancyr">Ethereum</p>
              <ArrowTopRightIcon className="size-full" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
