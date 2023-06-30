import { Cluster } from "@solana/web3.js";
const RPC_URL =
  "https://api.devnet.solana.com";

export const CLUSTER: Cluster = "devnet";
export { RPC_URL };

export const TOKEN_MINTS = new Map<string, string>([
  ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", "USDC"],
  ["So11111111111111111111111111111111111111112", "SOL"],
  ["Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYBUSDT", "USDT"],
]);
