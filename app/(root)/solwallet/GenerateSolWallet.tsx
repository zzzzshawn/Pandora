"use client";
import React, { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import bs58 from "bs58";
import { TbBrandSnowflake } from "react-icons/tb";
import Image from "next/image";

interface Props {
  mnemonic: string;
}

interface KeypairData {
  publicKey: string;
  privateKey: string;
}

const GenerateSolWallet = ({ mnemonic }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keypairs, setKeypairs] = useState<KeypairData[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean[]>([]);

  const generateWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

    const keypair = Keypair.fromSecretKey(secret);

    setKeypairs((prevKeypairs) => [
      ...prevKeypairs,
      {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey),
      },
    ]);

    // Add a new entry to `showPrivateKey` for the new wallet
    setShowPrivateKey((prevKeys) => [...prevKeys, false]);

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    generateWallet();
  }, [mnemonic]);

  const handleWalletDelete = (index: number) => {
    setKeypairs((prevKeypairs) => prevKeypairs.filter((_, i) => i !== index));
    setShowPrivateKey((prevKeys) => prevKeys.filter((_, i) => i !== index));
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setShowPrivateKey((prevKeys) =>
      prevKeys.map((key, i) => (i === index ? !key : key))
    );
  };

  return (
    <div className="w-full flex flex-col gap-5 mt-5">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-5xl">Your Wallets</h2>
        <Button
          onClick={() => generateWallet()}
          className="bg-white text-black hover:text-white"
        >
          Add Wallet
        </Button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {keypairs.map((keypair, index) => (
          <div
            key={index}
            className="flex flex-col p-8 border border-dark-4 bg-black z-10 rounded-3xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-2  ">
                <Image
                  src={`/solana.png`}
                  alt=""
                  width={1024}
                  height={1024}
                  className="size-10"
                />
                <h1 className="text-2xl leading-8">Wallet {index + 1}</h1>
              </div>
              <Trash
              className="w-4 text-red hover:text-red/60 cursor-pointer"
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
                <Eye className="w-4 cursor-pointer" onClick={() => togglePrivateKeyVisibility(index)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateSolWallet;
