import {
  Transaction,
  VersionedTransaction,
  PublicKey,
  Connection,
} from "@solana/web3.js";
import { useDidLaunch, usePublicKeys } from "./useXnft";
import { useWallet as useWalletAdapterReact } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useMemo, useState } from "react";
import { isXnft } from "../platform";
import { Elusiv } from "@elusiv/sdk";
import { CLUSTER, RPC_URL } from "../constant";

export type Tx = Transaction | VersionedTransaction;

function signAllTransactions<T extends Tx>(e: T[]): Promise<T[]> {
  return window.xnft.solana.signAllTransactions(e);
}

function signTransaction<T extends Tx>(transaction: T): Promise<T> {
  return window.xnft.solana.signTransaction(transaction);
}

function signMessage(message: Uint8Array): Promise<Uint8Array> {
  return window.xnft.solana.signMessage(message);
}

export const useWalletXnft = () => {
  const publicKey = usePublicKeys().get("solana");
  const didLaunch = useDidLaunch();
  const [elusiv, setElusiv] = useState<Elusiv>();

  const conn: Connection = new Connection(RPC_URL);

  useEffect(() => {
    const getElusiv = async (): Promise<void> => {
      const seed: Uint8Array = await signMessage(
        Buffer.from(`Sign this message to generate the Elusiv seed. This allows the application to decrypt your private assets so you can spend them privately.\n\nIMPORTANT: Only sign this message if you trust this application.`)
      );
      const elusiv: Elusiv = await Elusiv.getElusivInstance(
        seed,
        new PublicKey(publicKey || ""),
        conn,
        CLUSTER
      );
      console.log("elusivInstance", elusiv);
      setElusiv(elusiv);
    };
    getElusiv();
  }, [publicKey]);
  const res = useMemo(() => {
    return {
      connected: !!didLaunch && !!publicKey,
      signTransaction: signTransaction,
      publicKey: publicKey ? new PublicKey(publicKey) : undefined,
      signAllTransactions,
      setVisible: (x: boolean) => console.log("No need for setVisible"),
      visible: false,
      signMessage,
      elusiv,
      conn,
    };
  }, [didLaunch, publicKey, elusiv]);

  return res;
};

export const useWallet = useWalletXnft;
