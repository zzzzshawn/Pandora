"use client";
import { Button } from "@/components/ui/button";
import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { motion } from "framer-motion";
import { Eye, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface Props {
  mnemonic: string;
  setMnemonic: (mnemonic: string) => void;
}

interface KeypairData {
  publicKey: string;
  privateKey: string;
}

const GenerateEthWallet = ({ mnemonic, setMnemonic }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keypairs, setKeypairs] = useState<KeypairData[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean[]>([]);

  useEffect(() => {
    const storedWallets = localStorage.getItem("EthWallets");

    if (storedWallets) {
      setKeypairs(JSON.parse(storedWallets));
      setShowPrivateKey(JSON.parse(storedWallets).map(() => false));
    }
  }, []);

  const generateEthWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    const newWallet = {
      publicKey: wallet.address,
      privateKey: wallet.privateKey,
    };

    // Store in localStorage
    const storedWallets = JSON.parse(
      localStorage.getItem("EthWallets") || "[]"
    );
    const updatedWallets = [...storedWallets, newWallet];
    localStorage.setItem("EthWallets", JSON.stringify(updatedWallets));

    setKeypairs(updatedWallets);
    setShowPrivateKey((prevKeys) => [...prevKeys, false]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    toast.success('Wallet created')
  };

  useEffect(() => {
    const walletExists: string | null = localStorage.getItem("EthWallets");
    if (walletExists?.length === 0 || walletExists === undefined) {
      generateEthWallet();
    }
  }, []);

  const handleWalletDelete = (index: number) => {
    const storedWallets = JSON.parse(
      localStorage.getItem("EthWallets") || "[]"
    );

    const updatedWallets = storedWallets.filter(
      (_: KeypairData, i: number) => i !== index
    );
    localStorage.setItem("EthWallets", JSON.stringify(updatedWallets));

    setKeypairs(updatedWallets);
    setShowPrivateKey((prevKeys) => prevKeys.filter((_, i) => i !== index));
    toast.success('Wallet deleted')
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setShowPrivateKey((prevKeys) =>
      prevKeys.map((key, i) => (i === index ? !key : key))
    );
  };

  const clear = () => {
    localStorage.removeItem("EthWallets");
    localStorage.removeItem("EthMnemonic");
    setMnemonic("");
    setKeypairs([]);
    setShowPrivateKey([]);
    setCurrentIndex(0);
  };

  const handleClear = () => {
    toast.warning("Are you sure you want to delete all your wallets?", {
      action: {
        label: "Delete",
        onClick: () => clear(),
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-5 mt-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="w-full flex items-center justify-between"
      >
        <h2 className="text-5xl">Your Wallets</h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => generateEthWallet()}
            className="bg-white text-black hover:text-white"
          >
            Add Wallet
          </Button>
          <Button
            onClick={() => handleClear()}
            className="bg-white text-black hover:text-white"
          >
            Clear Wallets
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.75 }}
        className="grid md:grid-cols-2 grid-cols-1 gap-5"
      >
        {keypairs.map((keypair, index) => (
          <div
            key={index}
            className="flex flex-col p-8 border border-dark-4 bg-black z-10 rounded-3xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-2  ">
                <Image
                  src={`/eth.png`}
                  alt=""
                  width={1024}
                  height={1024}
                  className="size-9"
                />
                <h1 className="text-2xl leading-8">Wallet {index + 1}</h1>
              </div>
              <Trash
                className="w-4 text-red hover:text-red/50 cursor-pointer"
                onClick={() => {
                  handleWalletDelete(index);
                }}
              />
            </div>
            <div className="my-3 px-3 break-words">
              <p className="text-xl">Public Key:</p>
              <p className="text-xs">{keypair.publicKey}</p>
            </div>
            <div className="px-3 break-words">
              <p className="text-xl">Private Key:</p>
              <div className="flex justify-between items-start">
                <p className="text-xs border-none focus:ring-0 word-break: break-all w-[80%]">
                  {!showPrivateKey[index]
                    ? "*".repeat(keypair.privateKey.length)
                    : keypair.privateKey}
                </p>
                <Eye
                  className="w-4 cursor-pointer hover:text-zinc-600"
                  onClick={() => togglePrivateKeyVisibility(index)}
                />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GenerateEthWallet;
