import { View, Text } from "react-native";
import { colors } from "../constants/theme";

export default function Splash() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: colors.primary, fontSize: 24, fontWeight: "bold" }}>Smart Menu</Text>
    </View>
  );
}
