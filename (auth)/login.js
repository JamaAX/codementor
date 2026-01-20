import { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const { colors } = useTheme();
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async () => {
    setErrMsg("");
    if (!username || !password) {
      setErrMsg("Please enter username and password.");
      return;
    }

    try {
      await login(username.trim(), password);
      router.replace("/(tabs)");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Try again.";
      setErrMsg(msg);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="flex-1 px-6 py-10 gap-8">
          <View className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-3xl p-6 shadow-lg">
            <Text className="text-white text-3xl font-black">Welcome back</Text>
            <Text className="text-purple-100 mt-2">
              Sign in to keep mentoring your code.
            </Text>
          </View>

          <View
            className="rounded-3xl p-5 shadow-xl gap-5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            <View className="gap-2">
              <Text style={{ color: colors.text }} className="font-semibold">
                Username
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholder="your username"
                placeholderTextColor="#6b7280"
                className="rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            <View className="gap-2">
              <Text style={{ color: colors.text }} className="font-semibold">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor="#6b7280"
                className="rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {errMsg ? (
              <Text style={{ color: "#EF4444" }} className="font-semibold">
                {errMsg}
              </Text>
            ) : null}

            <Pressable
              onPress={onSubmit}
              disabled={loading}
              className="rounded-2xl py-4 items-center"
              style={({ pressed }) => ({
                backgroundColor: pressed ? colors.accent : colors.accentStrong,
                shadowColor: colors.accentStrong,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                opacity: loading ? 0.7 : 1,
              })}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Sign in</Text>
              )}
            </Pressable>
          </View>

          <Text className="text-center text-gray-400">
            No account?{" "}
            <Link
              href="/(auth)/register"
              className="text-pink-400 font-semibold"
            >
              Create one
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
