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
  SafeAreaView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    if (!name || !email || !password) return;
    await register({ name, email, password });
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="flex-1 px-6 py-10 gap-8">
          <View className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] rounded-3xl p-6 shadow-xl border border-white/10">
            <Text className="text-white text-3xl font-black">
              Create account
            </Text>
            <Text className="text-purple-100 mt-2">
              Unlock tailored help for your code.
            </Text>
          </View>

          <View
            className="rounded-3xl p-5 shadow-2xl gap-5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            <View className="gap-2">
              <Text style={{ color: colors.text }} className="font-semibold">
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Jane Dev"
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
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@example.com"
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
                <Text className="text-white font-bold text-lg">
                  Create account
                </Text>
              )}
            </Pressable>
          </View>

          <Text className="text-center text-gray-400">
            Have an account?{" "}
            <Link
              href="/(auth)/login"
              className="text-purple-300 font-semibold"
            >
              Sign in
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
