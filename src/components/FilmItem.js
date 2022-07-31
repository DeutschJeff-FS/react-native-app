import { SafeAreaView, Text } from "react-native";

export default function ListItem({ children }) {
  return (
    <SafeAreaView>
      <Text>{children}</Text>
    </SafeAreaView>
  );
}
