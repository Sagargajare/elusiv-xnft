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
import { usePrivateBalance } from "../../hooks/balance";
import { useWallet } from "../../hooks/useWallet";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type Props = {};

const Index = (props: Props) => {
  const [transationMessage, setTransationMessage] = React.useState("");
  const { publicKey, setVisible, connected, conn, signTransaction } =
    useWallet();
  const { isLoading, privateBalance, refreshData, elusiv } =
    usePrivateBalance();
  const [number, setNumber] = React.useState("");
  const [isTrasanctionLoading, setTrasanctionLoading] = React.useState(false);

  const topupValidation = () => {
    if (!number) {
      return "Please enter a number";
    }
    if (Number(number) > privateBalance.tokenPublicBalance) {
      return "You don't have enough balance";
    }

    return false;
  };
  const topup = async () => {
    try {
      setTrasanctionLoading(true);
      console.log("topup 1", elusiv);
      if (elusiv) {
        const topupTx = await elusiv.buildTopUpTx(
          Number(number) * LAMPORTS_PER_SOL,
          "LAMPORTS"
        );
        const sign = await signTransaction(topupTx.tx);
        console.log(sign);
        const sig = await elusiv.sendElusivTx(topupTx);
        setTransationMessage(`Send complete with sig ${sig.signature}`);
      }
      console.log("topup 2");
      console.log(
        "topup 3",
        privateBalance.tokenPrivateBalance,
        privateBalance.tokenPublicBalance
      );
    } catch (error) {
        setTransationMessage(`Transaction Failed! ${error}`);
    } finally {
      await refreshData();
      setTrasanctionLoading(false);
    }
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
      <View style={tw`mt-10 py-4 h-full`}>
        <View>
          <Text style={tw`text-center text-white text-3xl tracking-[3px] py-2`}>
            Topup
          </Text>
          <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
            (Transfer from Public Balance to Private Balance)
          </Text>
        </View>
        <View>
          <View style={tw`flex flex-row justify-around`}>
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-center text-white text-2xl tracking-[3px] py-2`}
              >
                {privateBalance.tokenPrivateBalance.toFixed(2)} SOL
              </Text>
              <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
                Private Balance
              </Text>
            </View>
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-center text-white text-2xl tracking-[3px] py-2`}
              >
                {privateBalance.tokenPublicBalance.toFixed(2)} SOL
              </Text>
              <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
                Public Balance
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TextInput
            style={tw`bg-[#3B4758] rounded p-2 mt-5 text-white focus:border-green-400 placeholder-gray-50 h-12`}
            onChangeText={(text) => setNumber(text.replace(/[^0-9.]/g, ""))}
            value={number}
            placeholder="Topup Amount"
            keyboardType="number-pad"
          />
          {topupValidation() && (
            <Text style={tw`text-xs px-1 text-[#FF316A] pt-1`}>
              {topupValidation()}
            </Text>
          )}
        </View>

        <TouchableOpacity
          disabled={!!topupValidation()}
          style={tw`mt-4`}
          onPress={topup}
        >
          {isTrasanctionLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={tw`bg-blue-300 rounded p-2 text-center `}>TopUp</Text>
          )}
        </TouchableOpacity>
        <Text style={tw`text-lg text-lime-400`}>{transationMessage}</Text>
      </View>
    </Screen>
  );
};

export default Index;
