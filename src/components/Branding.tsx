import React from "react";
import { Screen } from "./Screen";
import tw from "twrnc";
import { View, Text } from "react-native";
type Props = {};

const Branding = (props: Props) => {
  return (
    <Screen style={tw`bg-[#161B21] text-white`}>
      <View style={tw`flex flex-col mt-10 text-center`}>
        <Text style={tw`text-xl text-[#CBD3DD] text-center`}>StealthWallet</Text>
        <Text style={tw`text-sm text-[#CBD3DD] text-center`}>
          Powered By Elusiv Protocol
        </Text>
      </View>
    </Screen>
  );
};

export default Branding;
