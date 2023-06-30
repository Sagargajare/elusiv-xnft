import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { RPC_URL, TOKEN_MINTS } from "../constant";
import { getParams } from "../services/Boilerplate";
import { usePublicKeys } from "./useXnft";
import { useWallet } from "./useWallet";
import useElusiv from "./useElusiv";
type TokenBalance = {
  tokenSymbol: string;
  tokenMint: string;
  tokenBalance: number;
};

type PrivateTokenBalance = {
  tokenSymbol: string;
  tokenMint: string;
  tokenBalance: number;
}
export function usePublicBalance() {
  const [publicBalance, setPublicBalance] = useState<TokenBalance[]>();
  const { publicKey, setVisible, connected , conn} = useWallet();
  console.info("usePublicBalance:- ", publicKey);
 
  useEffect(() => {
    const getPublicBalance = async () => {
      const balance = connected
        ? await conn.getBalance(publicKey || new PublicKey(""))
        : 0;
      const tokenAccounts = await conn.getParsedTokenAccountsByOwner(
        publicKey || new PublicKey(""),
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
        }
      );

      const TokenBalaceArray = tokenAccounts.value.map((tokenAccount) => {
        return {
          tokenSymbol:
            TOKEN_MINTS.get(tokenAccount.account.data.parsed.info.mint) ||
            "Unknown (SOL,USDC,USDT supported)",
          tokenMint: tokenAccount.account.data.parsed.info.mint,
          tokenBalance:
            tokenAccount.account.data.parsed.info.tokenAmount.uiAmount,
        };
      });

      TokenBalaceArray.push({
        tokenSymbol: "SOL",
        tokenMint: "So11111111111111111111111111111111111111112",
        tokenBalance: balance / LAMPORTS_PER_SOL,
      });

      setPublicBalance(TokenBalaceArray);
    };
    getPublicBalance();
  }, [connected]);

  return publicBalance;
}

export function usePrivateBalance() {
  const [privateBalance, setPrivateBalance] = useState<PrivateTokenBalance[]>([]);
  const { publicKey, setVisible, connected,conn,elusiv } = useWallet();
  
  console.log(elusiv);
  useEffect(() => {
    console.debug("STep 1");
    const getPrivateBalance = async () => {
      console.debug("STep 2");
      if(elusiv) {
        const privateUsdc = await elusiv.getLatestPrivateBalance('USDC');
        const privateUsdt = await elusiv.getLatestPrivateBalance('USDT');
        const privateSol = await elusiv.getLatestPrivateBalance('LAMPORTS');
        setPrivateBalance([
          {
            tokenSymbol: "USDC",
            tokenMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            tokenBalance: Number(privateUsdc)/1000000,
          },{
            tokenSymbol: "USDT",
            tokenMint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYBUSDT",
            tokenBalance: Number(privateUsdt)/1000000,
          },{
            tokenSymbol: "SOL",
            tokenMint:"So11111111111111111111111111111111111111112",
            tokenBalance: Number(privateSol)/LAMPORTS_PER_SOL
          }
        ])
      }else{
        setPrivateBalance([]);
      }
    };
    console.debug("STep 3");
    getPrivateBalance();
    console.debug("STep 4");
  }, [elusiv]);

  return privateBalance;
}
