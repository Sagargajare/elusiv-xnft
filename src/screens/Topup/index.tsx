import React from "react";
import { Screen } from "../../components/Screen";
import { Text, FlatList, TextInput, Button } from "react-native";
import tw from "twrnc";
import { usePrivateBalance, usePublicBalance } from "../../hooks/balance";
import { useWallet } from "../../hooks/useWallet";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type Props = {};

const Index = (props: Props) => {
  const privateBalance = usePrivateBalance();
  const { publicKey, setVisible, connected, conn, elusiv, signTransaction } =
    useWallet();
  const [number, onChangeNumber] = React.useState("");
  const topup = async () => {
    if (elusiv) {
      const topupTx = await elusiv.buildTopUpTx(
        0.2 * LAMPORTS_PER_SOL,
        "LAMPORTS"
      );
      const sign = await signTransaction(topupTx.tx);
      console.log(sign);
      return elusiv.sendElusivTx(topupTx);
    }
    return null;
  };
  return (
    <Screen>
      
        <TextInput
          style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="number-pad"
        />
     
      <Button onPress={() => topup()} title="Topup" />
    </Screen>
  );
};

export default Index;
