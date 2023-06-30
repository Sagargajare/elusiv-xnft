import React from "react";
import { Screen } from "../../components/Screen";
import { Text, FlatList, Button, View } from "react-native";
import tw from "twrnc";
import { Connection, Keypair } from "@solana/web3.js";
import { Elusiv, SEED_MESSAGE } from "@elusiv/sdk";
import { usePrivateBalance, usePublicBalance } from "../../hooks/balance";

type Props = {};
const ItemSeparatorComponent = () => (
  <View
    style={{ marginVertical: 8, borderColor: "#000000", borderBottomWidth: 4 }}
  />
);
const Index = (props: Props) => {
  const publicBalance = usePublicBalance();
  const privateBalance = usePrivateBalance();
  console.log(publicBalance, privateBalance);

  return (
    <Screen>
      <Text style={tw`mb-4 text-md`}>Balance</Text>
      <Text>Public:-</Text>
      <FlatList
        style={{ flex: 1 }}
        data={publicBalance}
        keyExtractor={(item) => item.tokenMint}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.tokenSymbol} - {item.tokenBalance}
            </Text>
          );
        }}
      />
       <FlatList
        style={{ flex: 1 }}
        data={privateBalance}
        keyExtractor={(item) => item.tokenMint}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return (
            <Text>
              {item.tokenSymbol} - {item.tokenBalance}
            </Text>
          );
        }}
      />
    </Screen>
  );
};

export default Index;
