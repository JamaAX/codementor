import { useMemo, useState } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const canSubmit = useMemo(() => {
    const n = name.trim().length >= 2;
    const e = /^\S+@\S+\.\S+$/.test(email.trim());
    const p = password.length >= 6;
    const c = confirm.length >= 6 && confirm === password;
    return n && e && p && c && !loading;
  }, [name, email, password, confirm, loading]);

  const onSubmit = async () => {
    setErrMsg("");

    const n = name.trim();
    const e = email.trim().toLowerCase();

    if (n.length < 2) return setErrMsg("Name must be at least 2 characters.");
    if (!/^\S+@\S+\.\S+$/.test(e)) return setErrMsg("Please enter a valid email.");
    if (password.length < 6) return setErrMsg("Password must be at least 6 characters.");
    if (password !== confirm) return setErrMsg("Passwords do not match.");

    try {
      // ✅ map to backend format: username/password
      await register({
        username: e,
        password,
        displayName: n, // optional; backend can ignore for now
      });

      router.replace("/(tabs)");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Try again.";
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
          {/* Header */}
          <View className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] rounded-3xl p-6 shadow-xl border border-white/10">
            <Text className="text-white text-3xl font-black">Create account</Text>
            <Text className="text-purple-100 mt-2">
              Unlock tailored help for your code.
            </Text>
          </View>

          {/* Form Card */}
          <View
            className="rounded-3xl p-5 shadow-2xl gap-5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            {/* Name */}
            <View className="gap-2">
              <Text style={{ color: colors.text }} className="font-semibold">
                Name
              </Text>
              <View
                className="rounded-2xl px-4 py-3 flex-row items-center"
                style={{
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color={colors.textSecondary}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Jane Dev"
                  placeholderTextColor="#6b7280"
                  style={{ flex: 1, color: colors.text }}
                />
              </View>
            </View>

            {/* Email */}
            <View className="gap-2">
              <Text style={{ color: colors.text }} className="font-semibold">
                Email
              </Text>
              <View
                className="rounded-2xl px-4 py-3 flex-row items-center"
                style={{
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={colors.textSecondary}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="you@example.com"
                  placeholderTextColor="#6b7280"
                  style={{ flex: 1, color: colors.text }}
                />
              </View>
            </View>

            {/* Password */}
            <View className="gap-2">
              <Text style={{ color: colors.text }} className="font-semibold">
                Password
              </Text>
              <View
                className="rounded-2xl px-4 py-3 flex-row items-center"
                style={{
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={colors.textSecondary}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  style={{ flex: 1, color: colors.text }}
                />
                <Pressable onPress={() => setShowPass((v) => !v)}>
                  <MaterialCommunityIcons
                    name={showPass ? "eye-off" : "eye"}
                    size={20}
                    color={colors.textSecondary}
                  />
                </Pressable>
              </View>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                Minimum 6 characters.
              </Text>
            </View>

            {/* Confirm */}
            <View className="gap-2">
              <Text style={{ color: colors.text }} className="font-semibold">
                Confirm password
              </Text>
              <View
                className="rounded-2xl px-4 py-3 flex-row items-center"
                style={{
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="lock-check-outline"
                  size={20}
                  color={colors.textSecondary}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry={!showPass}
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  style={{ flex: 1, color: colors.text }}
                />
              </View>
            </View>

            {/* Error */}
            {errMsg ? (
              <View
                className="rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: "#EF444420",
                  borderColor: "#EF444460",
                  borderWidth: 1,
                }}
              >
                <Text style={{ color: "#EF4444", fontWeight: "600" }}>
                  {errMsg}
                </Text>
              </View>
            ) : null}

            {/* Submit */}
            <Pressable
              onPress={onSubmit}
              disabled={!canSubmit}
              className="rounded-2xl py-4 items-center"
              style={({ pressed }) => ({
                backgroundColor: !canSubmit
                  ? `${colors.textSecondary}55`
                  : pressed
                  ? colors.accent
                  : colors.accentStrong,
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
                <Text className="text-white font-bold text-lg">Create account</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <Text className="text-center text-gray-400">
            Have an account?{" "}
            <Link href="/(auth)/login" className="text-purple-300 font-semibold">
              Sign in
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
