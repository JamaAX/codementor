import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Switch,
  Pressable,
  Alert,
  Linking,
  
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const router = useRouter();
  const { scheme, isDark, colors, toggle } = useTheme();
  const [prefs, setPrefs] = useState({
    push: true,
    email: false,
    dark: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("user_settings");
        if (stored) setPrefs(JSON.parse(stored));
      } catch (err) {
        console.warn("Settings load failed", err);
      }
    })();
  }, []);

  const updatePref = async (key, value) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    try {
      await AsyncStorage.setItem("user_settings", JSON.stringify(next));
    } catch (err) {
      console.warn("Settings save failed", err);
    }
  };

  const contactSupport = async () => {
    const url = "mailto:support@example.com?subject=Code%20Mentor%20Support";
    const supported = await Linking.canOpenURL(url);
    if (supported) return Linking.openURL(url);
    Alert.alert("Unable to open mail", "Please email support@example.com");
  };

  const openPrivacy = async () => {
    const url = "https://example.com/privacy";
    const supported = await Linking.canOpenURL(url);
    if (supported) return Linking.openURL(url);
    Alert.alert("Unable to open link", url);
  };

  useEffect(() => {
    // sync visual toggle with theme context
    setPrefs((prev) => ({ ...prev, dark: isDark }));
  }, [isDark]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView className="flex-1">
        <View
          style={{ backgroundColor: colors.accent }}
          className="pt-12 pb-12 px-6 rounded-b-[40px]"
        >
          <Text className="text-white text-3xl font-bold">Settings</Text>
          <Text className="text-purple-100 mt-1">Tune your experience</Text>
        </View>

        <View className="px-6 -mt-6 gap-4">
          <View
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
            className="border rounded-3xl p-5 shadow-xl"
          >
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold mb-4"
            >
              Preferences
            </Text>

            <View className="flex-row items-center justify-between py-3 border-b border-gray-800">
              <Text style={{ color: colors.text }}>Push notifications</Text>
              <Switch
                value={prefs.push}
                onValueChange={(v) => updatePref("push", v)}
                thumbColor="#a855f7"
                trackColor={{ true: "#a855f7" }}
              />
            </View>

            <View className="flex-row items-center justify-between py-3 border-b border-gray-800">
              <Text style={{ color: colors.text }}>Email summaries</Text>
              <Switch
                value={prefs.email}
                onValueChange={(v) => updatePref("email", v)}
                thumbColor="#a855f7"
                trackColor={{ true: "#a855f7" }}
              />
            </View>

            <View className="flex-row items-center justify-between py-3">
              <Text style={{ color: colors.text }}>Dark mode</Text>
              <Switch
                value={prefs.dark}
                onValueChange={(v) => {
                  updatePref("dark", v);
                  toggle();
                }}
                thumbColor="#a855f7"
                trackColor={{ true: "#a855f7" }}
              />
            </View>
          </View>

          <View
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
            className="border rounded-3xl p-5 shadow-xl gap-3"
          >
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold"
            >
              Support
            </Text>
            <Text style={{ color: colors.sub }}>
              Need help? Reach out or review terms.
            </Text>

            <Pressable
              onPress={contactSupport}
              style={{
                backgroundColor: colors.input,
                borderColor: colors.border,
              }}
              className="border rounded-2xl px-4 py-3"
            >
              <Text style={{ color: colors.text }} className="font-semibold">
                Contact support
              </Text>
            </Pressable>
            <Pressable
              onPress={openPrivacy}
              style={{
                backgroundColor: colors.input,
                borderColor: colors.border,
              }}
              className="border rounded-2xl px-4 py-3"
            >
              <Text style={{ color: colors.text }} className="font-semibold">
                Privacy & terms
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.back()}
            className="rounded-2xl py-4 items-center mb-8"
            style={({ pressed }) => ({
              backgroundColor: pressed ? colors.accent : colors.accentStrong,
              shadowColor: colors.accentStrong,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            })}
          >
            <Text className="text-white font-bold">Back to profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

