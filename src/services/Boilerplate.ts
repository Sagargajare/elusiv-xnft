import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Elusiv, SEED_MESSAGE } from "@elusiv/sdk";
import { CLUSTER, RPC_URL } from "../constant";
import { usePublicKeys } from "../hooks/useXnft";

// Boilerplate code used by all samples

// Helper function to generate params used by all samples, namely a web3js connection, the keypair of the user, and the elusiv instance
export async function getParams(
  publicKey: string
): Promise<{
  elusiv: Elusiv;
  conn: Connection;
}> {
  // Connect to devnet
  const conn = new Connection(RPC_URL);

  // Generate a keypair from the private key to retrieve the public key and optionally
  // sign txs

  // Generate the input seed. Remember, this is almost as important as the private key, so don't log this!
  // (We use sign from an external library here because there is no wallet connected. Usually you'd use the wallet adapter here)
  // (Slice because in Solana's keypair type the first 32 bytes is the privkey and the last 32 is the pubkey)
  // const seed = await sign(
  //     Buffer.from(SEED_MESSAGE, 'utf-8'),
  //     keyPair.secretKey.slice(0, 32),
  // );
  const seed = window.xnft.solana.signMessage(
    Buffer.from(`The time is: ${new Date().toLocaleTimeString()}`)
  );
  // Create the elusiv instance

  const elusiv = await Elusiv.getElusivInstance(
    seed,
    new PublicKey(`${publicKey}`),
    conn,
    CLUSTER
  );

  return { elusiv, conn };
}

