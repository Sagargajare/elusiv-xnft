import React from 'react'
import { Screen } from '../../components/Screen'
import { Text, FlatList } from "react-native";
import tw from "twrnc";

type Props = {}

const Index = (props: Props) => {
  return (
    <Screen>
       <Text style={tw`mb-4 text-md`}>Transfer History</Text>
    </Screen>
  )
}

export default Index