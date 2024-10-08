"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { generateMnemonic, validateMnemonic } from "bip39";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GenerateSolWallet from "@/app/(root)/solwallet/GenerateSolWallet";
import GenerateEthWallet from "@/app/(root)/ethwallet/GenerateEthWallet";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface WalletProps {
  wallet: string;
}

const GenerateWallet = ({ wallet }: WalletProps) => {
  const [solMnemonic, setSolMnemonic] = useState("");
  const [ethMnemonic, setEthMnemonic] = useState("");
  const [showMnemonicInput, setShowMnemonicInput] = useState(false);
  const [solInput, setSolInput] = useState("");
  const [ethInput, setEthInput] = useState("");

  const getMnemonic = async () => {
    const secretPhrase = await generateMnemonic();
    if (wallet === "solana") {
      localStorage.setItem("SolMnemonic", secretPhrase);
      localStorage.setItem("SolWallets", "");
      setSolMnemonic(secretPhrase);
      toast.success('Seed phrase generated')
    } else if (wallet === "ethereum") {
      localStorage.setItem("EthMnemonic", secretPhrase);
      localStorage.setItem("EthWallets", "");
      setEthMnemonic(secretPhrase);
      toast.success('Seed phrase generated')
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

  const handleRecover = () => {
    if (wallet === "solana") {
      if (validateMnemonic(solInput)) {
        setSolMnemonic(solInput);
        localStorage.setItem("SolMnemonic", solInput);
        localStorage.setItem("SolWallets", "");
        setSolInput("");
        toast.success("Seed phrase Valid");
      } else {
        toast.info("Seed phrase not valid");
      }
    } else if (wallet == "ethereum") {
      if (validateMnemonic(ethInput)) {
        setEthMnemonic(ethInput);
        localStorage.setItem("EthMnemonic", ethInput);
        localStorage.setItem("EthWallets", "");
        setEthInput("");
        toast.success("Seed phrase Valid");
      } else {
        toast.info("Seed phrase not valid");
      }
    }
  };

  return (
    <div className="flex items-start justify-start gap-3 py-1 flex-col">
      <div className=" flex gap-3 mt-3 w-full justify-start flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.75 }}
          className="flex items-center justify-start gap-3"
        >
          <Button
            onClick={() => getMnemonic()}
            disabled={wallet === "solana" ? !!solMnemonic : !!ethMnemonic}
            className={`bg-white text-black hover:text-white ${
              wallet == "solana" && solMnemonic ? "hidden" : ""
            } ${wallet === "ethereum" && ethMnemonic ? "hidden" : ""}`}
          >
            Generate Wallet
          </Button>
          <Button
            onClick={() => {
              setShowMnemonicInput(!showMnemonicInput);
            }}
            className="bg-white text-black hover:text-white"
          >
            Recover Wallet
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20, display: "none" }}
          animate={
            showMnemonicInput
              ? { opacity: 1, y: 0, display: "flex" }
              : { opacity: 0, y: -20, display: "none" }
          }
          className="w-full mt-2 flex items-center justify-center gap-2"
        >
          <Input
            onChange={(e) => {
              if (wallet === "solana") {
                setSolInput(e.target.value);
              } else if (wallet === "ethereum") {
                setEthInput(e.target.value);
              }
            }}
            value={wallet === "solana" ? solInput : ethInput}
            placeholder="Enter your seed phrase"
            className="border-white/50 "
          />
          <Button
            className="bg-white text-black hover:text-white"
            onClick={handleRecover}
          >
            Recover
          </Button>
        </motion.div>
      </div>

      {wallet === "solana" && solMnemonic && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="w-full mt-12 bg-black z-10"
        >
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
        </motion.div>
      )}

      {wallet === "ethereum" && ethMnemonic && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="w-full mt-12 bg-black z-10"
        >
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
        </motion.div>
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
