import React from 'react'
import { Screen } from '../../components/Screen'
import { Text, FlatList } from "react-native";
import tw from "twrnc";

type Props = {}

const index = (props: Props) => {
  return (
    <Screen>
       <Text style={tw`mb-4 text-md`}>Transfer</Text>
    </Screen>
  )
}

export default index