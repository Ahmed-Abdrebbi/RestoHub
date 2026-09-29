import { View, Text, StyleSheet } from "react-native";

export default function Checkout() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Checkout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0D0D0D" },
  text: { color: "#FFFFFF" },
});
