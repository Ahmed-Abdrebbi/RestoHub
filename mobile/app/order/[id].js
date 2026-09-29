import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0D0D0D" }}>
      <Text style={{ color: "#FFFFFF" }}>Order tracking  id: {id}</Text>
    </View>
  );
}
