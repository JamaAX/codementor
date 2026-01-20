import { View, Text, Pressable, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView className="flex-1">
        {/* Header section mimicking the purple gradient top bar */}
        <View
          style={{ backgroundColor: colors.accent }}
          className="pt-12 pb-16 px-6 rounded-b-[40px]"
            
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-3xl font-bold">Account</Text>
            
              <Text className="text-purple-200 mt-1">Manage your identity</Text>
            </View>
            {/* Top right icon placeholder like the chart icon in your image */}
            <Pressable
              onPress={() => router.push("/(tabs)/settings")}

              className="bg-white/10 p-3 rounded-2xl border border-white/20"
            >
              <Text className="text-white">⚙️</Text>
            </Pressable>
          </View>
        </View>

        <View className="px-6 -mt-8">
          {/* User Info Card - Styled like the "E-commerce Platform" card */}
          <View
            className="rounded-[32px] p-6 shadow-2xl items-center"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            {/* Profile Avatar Placeholder - matching the purple icon style */}
            <View className="bg-[#8b5cf6] w-20 h-20 rounded-[24px] items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
              <Text className="text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>

            <Text style={{ color: colors.text }} className="text-2xl font-bold">
              {user?.name}
            </Text>
            <Text style={{ color: colors.sub }} className="mt-1">
              {user?.email}
            </Text>

            {/* Status Badge */}
            <View className="bg-purple-500/10 px-4 py-1 rounded-full mt-4 border border-purple-500/20">
              <Text className="text-purple-400 text-xs font-bold uppercase tracking-widest">
                Active Developer
              </Text>
            </View>
          </View>

          {/* Quick Stats Section - matching the 3-column stats at the top of your image */}
          <View className="flex-row gap-3 mt-4">
            <View
              className="flex-1 rounded-2xl p-4 items-center"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <Text
                style={{ color: colors.text }}
                className="font-bold text-lg"
              >
                3
              </Text>
              <Text
                style={{ color: colors.sub }}
                className="text-[10px] uppercase"
              >
                Active
              </Text>
            </View>
            <View
              className="flex-1 rounded-2xl p-4 items-center"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <Text
                style={{ color: colors.text }}
                className="font-bold text-lg"
              >
                12
              </Text>
              <Text
                style={{ color: colors.sub }}
                className="text-[10px] uppercase"
              >
                Tasks
              </Text>
            </View>
            <View
              className="flex-1 rounded-2xl p-4 items-center"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <Text className="text-pink-500 font-bold text-lg">68%</Text>
              <Text
                style={{ color: colors.sub }}
                className="text-[10px] uppercase"
              >
                Avg.
              </Text>
            </View>
          </View>

          {/* Logout Button - Styled like the "Create New Project" button */}
          <Pressable
            onPress={logout}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#be185d" : "#db2777", // Deep pink gradient feel
              shadowColor: "#db2777",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            })}
            className="rounded-2xl py-4 items-center mt-8"
          >
            <Text className="text-white font-bold text-lg">Logout Session</Text>
          </Pressable>

          <Text
            style={{ color: colors.sub }}
            className="text-center mt-6 text-xs italic"
          >
            Joined 743 days ago
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

