"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { generateMnemonic } from "bip39";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GenerateSolWallet from "@/app/(root)/solwallet/GenerateSolWallet";
import GenerateEthWallet from "@/app/(root)/ethwallet/GenerateEthWallet";

interface WalletProps {
  wallet: string;
}

const GenerateWallet = ({ wallet }: WalletProps) => {
  const [solMnemonic, setSolMnemonic] = useState("");
  const [ethMnemonic, setEthMnemonic] = useState("");

  const getMnemonic = async () => {
    const secretPhrase = await generateMnemonic();
    if (wallet === "solana") {
      localStorage.setItem("SolMnemonic", secretPhrase);
      localStorage.setItem("SolWallets", "");
      setSolMnemonic(secretPhrase);
    } else if (wallet === "ethereum") {
      localStorage.setItem("EthMnemonic", secretPhrase);
      localStorage.setItem("EthWallets", "");
      setEthMnemonic(secretPhrase);
    }
  };

  useEffect(() => {
    const localSol = localStorage.getItem("SolMnemonic");
    const localEth = localStorage.getItem("EthMnemonic");
    if (localSol && localSol.length > 0) {
      setSolMnemonic(localSol);
    }

    if (localEth && localEth.length > 0) {
      setEthMnemonic(localEth);
    }
  }, []);

  return (
    <div className="flex items-start justify-start gap-3 py-1 flex-col">
      <div className=" flex gap-3 mt-3 w-full justify-start">
        <Button
          onClick={() => getMnemonic()}
          disabled={wallet === "solana" ? !!solMnemonic : !!ethMnemonic}
          className={`bg-white text-black ${wallet == "solana" && solMnemonic ? "hidden" : ""} ${wallet === "ethereum" && ethMnemonic ? "hidden": ""}`}
        >
          Generate Wallet
        </Button>
        <Button className="bg-white text-black">Recover Wallet</Button>
      </div>

      {wallet === "solana" && solMnemonic && (
        <div className="w-full mt-12 bg-black z-10">
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl bg-black ">
                Your Secret Phrase (Solana)
              </AccordionTrigger>
              <AccordionContent className="bg-black ">
                <div className="grid grid-cols-3 gap-2">
                  {solMnemonic.split(" ").map((item) => (
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

      {wallet === "ethereum" && ethMnemonic && (
        <div className="w-full mt-12 bg-black z-10">
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl bg-black ">
                Your Secret Phrase (Ethereum)
              </AccordionTrigger>
              <AccordionContent className="bg-black ">
                <div className="grid grid-cols-3 gap-2">
                  {ethMnemonic.split(" ").map((item) => (
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

      {wallet === "solana" && solMnemonic && (
        <GenerateSolWallet
          mnemonic={solMnemonic}
          setMnemonic={setSolMnemonic}
        />
      )}

      {wallet === "ethereum" && ethMnemonic && (
        <GenerateEthWallet
          mnemonic={ethMnemonic}
          setMnemonic={setEthMnemonic}
        />
      )}
    </div>
  );
};

export default GenerateWallet;
