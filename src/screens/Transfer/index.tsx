import React from "react";
import { Screen } from "../../components/Screen";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { useWallet } from "../../hooks/useWallet";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { usePrivateBalance } from "../../hooks/balance";

type Props = {};

const Index = (props: Props) => {
  const [amount, setAmount] = React.useState("");
  const [transationMessage, setTransationMessage] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const [isTrasanctionLoading, setTrasanctionLoading] = React.useState(false);

  const { publicKey, setVisible, connected, conn, signTransaction } =
    useWallet();

  const { isLoading, privateBalance, refreshData, elusiv } =
    usePrivateBalance();

  const sendPrivateValidations = () => {
    if (!amount) {
      return "Please enter a number";
    }
    if (Number(amount) > privateBalance.tokenPrivateBalance) {
      return "You don't have enough private balance please topup";
    }
    try {
      const address = new PublicKey(recipient);
      if(!PublicKey.isOnCurve(address)) return "Please enter a valid address";
    } catch (error) {
      return "Please enter a valid address";
    }
    return false;
  };
  const sendPrivate = async () => {
    setTrasanctionLoading(true);
    try {
      if (elusiv) {
        const sendTx = await elusiv.buildSendTx(
          Number(amount) * LAMPORTS_PER_SOL,
          new PublicKey(recipient),
          "LAMPORTS"
        );
        const sig = await elusiv.sendElusivTx(sendTx);
        setTransationMessage(`Sent Privately with sig ${sig.signature}`);
      }
    } catch (error) {
      setTransationMessage(`Transaction Failed! ${error}`);
    } finally{
      setTrasanctionLoading(false);
      await refreshData();
    }
    
    return null;
  };
  return (
    <Screen style={tw`bg-[#161B21] text-white`}>
      <View>
        {isLoading && (
          <View style={tw`text-lg text-white flex flex-row justify-center p-3`}>
            <ActivityIndicator />{" "}
            <Text style={tw`text-white text-md mx-2`}> Loading...</Text>
          </View>
        )}
      </View>
      <View>
        <Text style={tw`text-center text-white text-3xl tracking-[3px] py-2`}>
          Send Privately
        </Text>
      </View>
      <View style={tw`my-5`}>
          <View style={tw`flex flex-row justify-around`}>
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-center text-white text-2xl tracking-[3px] py-2`}
              >
                ${privateBalance.tokenPrivateBalance.toFixed(2)} SOL
              </Text>
              <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
                Private Balance
              </Text>
            </View>
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-center text-white text-2xl tracking-[3px] py-2`}
              >
                ${privateBalance.tokenPublicBalance.toFixed(2)} SOL
              </Text>
              <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
                Public Balance
              </Text>
            </View>
          </View>
        </View>
      <TextInput
        style={tw`bg-[#3B4758] rounded p-2 mt-5 text-white focus:border-green-400 placeholder-gray-50 h-12`}
        onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
        value={amount}
        placeholder="Amount to Transfer"
        keyboardType="number-pad"
      />
      <TextInput
        style={tw`bg-[#3B4758] rounded p-2 mt-5 text-white focus:border-green-400 placeholder-gray-50 h-12`}
        onChangeText={setRecipient}
        value={recipient}
        placeholder="Recipient Address"
        keyboardType="number-pad"
      />
      <View style={tw`mt-5 p-2`}>
        <TouchableOpacity
          disabled={!!sendPrivateValidations()}
          style={tw`mt-4`}
          onPress={sendPrivate}
        >
          {isTrasanctionLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={tw`bg-blue-300 rounded p-2 text-center `}>Send Privately</Text>
          )}
        </TouchableOpacity>
        {sendPrivateValidations() && (
          <Text style={tw`text-xs px-1 text-[#FF316A] pt-1`}>
            {sendPrivateValidations()}
          </Text>
        )}
        <Text style={tw`text-md text-center text-[#CBD3DD]`}>{transationMessage}</Text>
      </View>
    </Screen>
  );
};

export default Index;
