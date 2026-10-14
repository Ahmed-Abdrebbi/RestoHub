import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import { useCartStore } from "../../store/useCartStore";
import { View, Text, StyleSheet } from "react-native";

function TabIcon({ name, focused, badge }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={24}
        color={focused ? colors.primary : colors.textMuted}
      />
      {badge > 0 && (
        <View style={tabStyles.badge}>
          <Text style={tabStyles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: "rgba(14,14,14,0.92)",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.5,
          shadowRadius: 24,
          elevation: 20,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          letterSpacing: 0.4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ focused }) => <TabIcon name="restaurant" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: "Assistant",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
              size={24}
              color={focused ? colors.primary : colors.textMuted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="bag" focused={focused} badge={itemCount} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon name="person-circle" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#0D0D0D",
    fontSize: 10,
    fontWeight: "700",
  },
});
