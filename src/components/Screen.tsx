import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
} from "react-native";
import tw from "twrnc";

type Props = {
  style?: StyleProp<ViewStyle>;
  children: JSX.Element | JSX.Element[] | null;
};
export function Screen({ style, children }: Props) {
  return (
    <ScrollView style={tw`bg-[#161B21] text-white`}>
      <View style={[styles.screen, style]}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
});
