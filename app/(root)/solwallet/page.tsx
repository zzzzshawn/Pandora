import GenerateWallet from '@/components/Wallet/GenerateWallet'
import React from 'react'

const SolWallet = () => {
  return (
    <div className='p-16 max-w-4xl mx-auto mt-10'>
      <h1 className='font-glancyr text-5xl'>Solana Wallets</h1>
      <GenerateWallet wallet="solana"/>
    </div>
  )
}

export default SolWallet