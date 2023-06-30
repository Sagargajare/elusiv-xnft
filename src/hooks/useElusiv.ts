import { Elusiv } from "@elusiv/sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { CLUSTER, RPC_URL } from "../constant";

import { useWallet } from "./useWallet";

const useElusiv = (): [Connection, Elusiv | undefined] => {
  const [elusiv, setElusiv] = useState<Elusiv>();
  const { publicKey, signTransaction, connected, setVisible , signMessage } = useWallet();
  
  const conn: Connection = new Connection(RPC_URL);
 
  useEffect(() => {
    const getElusiv = async (): Promise<void> => {
      const seed: Uint8Array = await signMessage(
        Buffer.from(`Sign this message to generate the Elusiv seed. This allows the application to decrypt your private assets so you can spend them privately.\n\nIMPORTANT: Only sign this message if you trust this application.`)
      );
      const elusiv: Elusiv = await Elusiv.getElusivInstance(
        seed,
        publicKey || new PublicKey(""),
        conn,
        CLUSTER
      );
      setElusiv(elusiv);
    };
    getElusiv();
  }, [connected]);

  return [conn, elusiv];
};

export default useElusiv;
