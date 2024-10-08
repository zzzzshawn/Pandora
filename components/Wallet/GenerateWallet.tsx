"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { generateMnemonic } from "bip39";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GenerateSolWallet from "@/app/(root)/solwallet/GenerateSolWallet";


interface WalletProps {
  wallet: string;
}

const GenerateWallet = ({ wallet }: WalletProps) => {
  const [mnemonic, setMnemonic] = useState("");

  const getMnemonic = async () => {
    const secretPhrase = await generateMnemonic();
    setMnemonic(secretPhrase);
  };

  return (
    <div className="flex items-start justify-start gap-3 py-1 flex-col">
      <div className=" flex gap-3 mt-3 w-full justify-start">
        <Button onClick={()=> getMnemonic()} disabled={mnemonic ? true : false} className={`bg-white text-black ${mnemonic ? "hidden": ""}`}>
          Generate Wallet
        </Button>
        <Button className="bg-white text-black">Recover Wallet</Button>
      </div>

      {mnemonic && (
        <div className="w-full mt-12 bg-black z-10">
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl bg-black ">
                Your Secret Phrase
              </AccordionTrigger>
              <AccordionContent className="bg-black ">
                <div className="grid grid-cols-3 gap-2">
                  {mnemonic.split(" ").map((item) => (
                    <p
                      key={item}
                      className="border border-dark-4 text-base text-white w-full p-2 text-center uppercase rounded-lg cursor-pointer hover:bg-white bg-black z-10 hover:text-black transition-all"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {wallet === "solana" && mnemonic && <GenerateSolWallet mnemonic={mnemonic} />}
    </div>
  );
};

export default GenerateWallet;
