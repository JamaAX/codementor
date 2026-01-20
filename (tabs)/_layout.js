import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Platform.OS === "ios" ? 88 : 68,
          paddingBottom: Platform.OS === "ios" ? 30 : 12,
          paddingTop: 12,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.sub,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"

        options={{
          tabBarLabel: "Ask",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`${focused ? "px-4 py-1 rounded-2xl" : ""}`}
              style={
                focused ? { backgroundColor: `${colors.accent}1A` } : undefined
              }
            >
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen

        name="history"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`${focused ? "px-4 py-1 rounded-2xl" : ""}`}
              style={
                focused ? { backgroundColor: `${colors.accent}1A` } : undefined
              }
            >
              <Ionicons
                name={focused ? "time" : "time-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen

        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`${focused ? "px-4 py-1 rounded-2xl" : ""}`}
              style={
                focused ? { backgroundColor: `${colors.accent}1A` } : undefined
              }
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen

        name="settings"
        options={{
          // hidden from tab bar; navigated via Profile screen
          href: null,
        }}
      />
    </Tabs>
  );
}


