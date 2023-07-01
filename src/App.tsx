import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons'; 
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";
import Balance from "./screens/Balance";
import Transfer from "./screens/Transfer";
import Topup from "./screens/Topup";
import { useWallet } from "./hooks/useWallet";
import { Entypo } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#7D8FA9",
        tabBarStyle: {
					backgroundColor: '#red',
					borderTopColor: 'transparent',
				}
      }}
    >
      <Tab.Screen
        name="Balance"
        component={Balance}
        options={{
          tabBarLabel: "Balance",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="wallet" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="TopUp"
        component={Topup}
        options={{
          tabBarLabel: "TopUp",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="save" color={color} size={size} />
          ),
        }}
      />
     <Tab.Screen
        name="Transfer"
        component={Transfer}
        options={{
          tabBarLabel: "Transfer",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="send" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const { publicKey, setVisible, connected } = useWallet();
  console.debug("publicKey", publicKey);
  console.error("connected", connected);
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (<>
  {
    !connected ? <Text>
      loading....
    </Text> :<RecoilRoot>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </RecoilRoot>
  }
  </>
    
  );
}

export default registerRootComponent(App);
