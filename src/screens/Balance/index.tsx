import React from "react";
import { Screen } from "../../components/Screen";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { usePrivateBalance } from "../../hooks/balance";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import SolIcon from "../../icons/Sol";
import { useNavigation } from "@react-navigation/native";
import Branding from "../../components/Branding";

type Props = {};

const Index = (props: Props) => {
  const { isLoading, privateBalance, refreshData } = usePrivateBalance();
  console.log("Private + public", isLoading, privateBalance, refreshData);
  const navigation = useNavigation();

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
        {window?.xnft?.metadata?.username && (
          <View style={tw`p-2 bg-[#3B4758] rounded`}>
            <Text style={tw`text-center text-[#CBD3DD] text-md`}>
              Gm {window.xnft.metadata.username}!
            </Text>
          </View>
        )}

        <View style={tw`mt-5`}>
          <Text style={tw`text-center text-white text-4xl tracking-[3px] py-2`}>
            ${privateBalance.totalValue.toFixed(2)}
          </Text>
          <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
            Total Assets Value
          </Text>
        </View>
        {/* Side by SIde Private and Public */}
        <View>
          <View style={tw`flex flex-row justify-around`}>
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-center text-white text-2xl tracking-[3px] py-2`}
              >
                ${privateBalance.tokenPrivateValue.toFixed(2)}
              </Text>
              <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
                Private Balance Value
              </Text>
            </View>
            <View style={tw`mt-5`}>
              <Text
                style={tw`text-center text-white text-2xl tracking-[3px] py-2`}
              >
                ${privateBalance.tokenPublicValue.toFixed(2)}
              </Text>
              <Text style={tw`text-center text-[#CBD3DD] text-xs`}>
                Public Balance Value
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={tw`flex flex-row mt-10 justify-around`}>
          <TouchableOpacity
            style={tw`text-center text-white w-fit`}
            onPress={() => navigation.navigate("TopUp" as never)}
          >
            <View style={tw`bg-[#FF316A] rounded-full p-2 w-[50px]`}>
              <Entypo name="save" color={"#ffffff"} size={30} />
            </View>

            <Text style={tw`text-[#FF316A] mt-2`}>Topup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`text-center text-white w-fit`}
            onPress={() => navigation.navigate("Transfer" as never)}
          >
            <View style={tw`bg-[#0DA678] rounded-full p-2 w-[50px]`}>
              <FontAwesome name="send" color={"#ffffff"} size={30} />
            </View>

            <Text style={tw`text-[#0DA678] mt-2`}>Transfer</Text>
          </TouchableOpacity>
        </View>

        {/* Coin Balance List */}
        <View style={tw`flex flex-row mt-10 py-2 w-full px-5 rounded bg-black`}>
          <View>
            <SolIcon />
          </View>
          <View style={tw`flex flex-row ml-2 flex-grow justify-between`}>
            <View>
              <Text style={tw`text-white text-lg`}>Solana</Text>
              <Text style={tw`text-[#CBD3DD] text-xs`}>SOL</Text>
            </View>
            <View>
              <Text style={tw`text-white text-lg`}>
                {privateBalance.tokenPrivateBalance.toFixed(2)} sol
              </Text>
              <Text style={tw`text-[#CBD3DD] text-xs`}>
                ${privateBalance.tokenUnitPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Powered By */}
        <Branding/>
      </View>
    </Screen>
  );
};

export default Index;
