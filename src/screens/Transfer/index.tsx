import React from "react";
import { Screen } from "../../components/Screen";
import { Text, FlatList, TextInput, Button } from "react-native";
import tw from "twrnc";
import { useWallet } from "../../hooks/useWallet";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

type Props = {};

const Index = (props: Props) => {
  const [amount, setAmount] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const { publicKey, setVisible, connected, conn, elusiv, signTransaction } =
    useWallet();
  const sendPrivate = async () => {
    if (elusiv) {
      const sendTx = await elusiv.buildSendTx(
        0.2 * LAMPORTS_PER_SOL,
        new PublicKey(recipient),
        "LAMPORTS"
      );
      // Send it off!
      return elusiv.sendElusivTx(sendTx);
    }
    return null;
  };
  return (
    <Screen>
      <Text style={tw`mb-4 text-md`}>Transfer</Text>
      <TextInput
        style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        onChangeText={setAmount}
        value={amount}
        placeholder="Amount to Transfer"
        keyboardType="number-pad"
      />
      <TextInput
        style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        onChangeText={setRecipient}
        value={recipient}
        placeholder="Recipient Address"
        keyboardType="number-pad"
      />
       <Button onPress={() => sendPrivate()} title="Transfer Privately" />
    </Screen>
  );
};

export default Index;
