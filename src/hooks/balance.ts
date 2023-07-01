import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { useWallet } from "./useWallet";

export function usePrivateBalance() {
  const [privateBalance, setPrivateBalance] = useState<{
    tokenPrivateBalance: number;
    tokenPrivateValue: number;
    tokenUnitPrice: number;
    tokenPublicBalance: number;
    tokenPublicValue: number;
    totalValue: number;
  }>({
    tokenPrivateBalance: 0,
    tokenPrivateValue: 0,
    tokenUnitPrice: 0,
    tokenPublicBalance: 0,
    tokenPublicValue: 0,
    totalValue: 0
  });
  const { publicKey, setVisible, connected, conn, elusiv } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const getSolanaPrice = async () => {
    const price = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    const json = await price.json();
    return json.solana.usd;
  }
  const getPublicBalance = async () => {
    const balance = connected ? await conn.getBalance(publicKey || new PublicKey("")) : BigInt(0);
    return Number(balance) / LAMPORTS_PER_SOL;
  };
  
  const getPrivateBalance = async () => {
    try {
      const solanaPrice = await getSolanaPrice();
      setLoading(true);
    const solanaPublicBalance = await getPublicBalance();
    if (elusiv) {
      const privateSol = await elusiv.getLatestPrivateBalance("LAMPORTS");
      setPrivateBalance({
        tokenPrivateBalance: Number(privateSol)/LAMPORTS_PER_SOL,
        tokenPrivateValue: Number(privateSol) * solanaPrice / LAMPORTS_PER_SOL,
        tokenUnitPrice: solanaPrice,
        tokenPublicBalance: solanaPublicBalance,
        tokenPublicValue: solanaPublicBalance * solanaPrice,
        totalValue: Number(privateSol) * solanaPrice / LAMPORTS_PER_SOL + solanaPublicBalance * solanaPrice
      });
    } else {
      setPrivateBalance({
        tokenPrivateBalance: 0,
        tokenPrivateValue: 0,
        tokenUnitPrice: solanaPrice,
        tokenPublicBalance: solanaPublicBalance,
        tokenPublicValue: solanaPublicBalance * solanaPrice,
        totalValue: solanaPublicBalance * solanaPrice
      });
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
    
  };
  useEffect(() => {
    
    getPrivateBalance();
  }, [elusiv]);

  const refreshData = async() => {
    await getPrivateBalance();
  };
  return {isLoading, privateBalance, refreshData , elusiv};
}

