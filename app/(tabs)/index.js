import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { token } = useAuth();
  const { colors } = useTheme();
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await api.post("/qa", { question, code }, token);
      setAnswer(res.item.answer);
      setQuestion("");
      setCode("");
    } catch (err) {
      Alert.alert("Request failed", err.message || "Could not ask question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header Section */}
        <View
          style={{ backgroundColor: "#6b21a8" }}
          className="pt-12 pb-10 px-6 rounded-b-[40px]"
        >
          <Text className="text-white text-3xl font-bold">Ask Mentor</Text>
          <Text className="text-purple-200 mt-1">
            Get help with your code snippets
          </Text>
        </View>

        <View className="px-6 -mt-4">
          {/* Main Input Card */}
          <View
            style={{
              backgroundColor: colors.card || "#161821",
              borderColor: colors.border,
            }}
            className="p-5 rounded-3xl border shadow-xl"
          >
            <Text className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-4">
              New Inquiry
            </Text>

            <View className="gap-5">
              {/* Question Input */}
              <View>
                <Text
                  style={{ color: colors.text }}
                  className="mb-2 font-medium"
                >
                  Your Question
                </Text>
                <TextInput
                  value={question}
                  onChangeText={setQuestion}
                  placeholder="How do I fix this state update?"
                  placeholderTextColor="#4b5563"
                  multiline
                  style={{
                    textAlignVertical: "top",
                    backgroundColor: colors.input,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                  }}
                  className="rounded-2xl px-4 py-4 min-h-[100px]"
                />
              </View>

              {/* Code Input */}
              <View>
                <Text
                  style={{ color: colors.text }}
                  className="mb-2 font-medium"
                >
                  Code Snippet
                </Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="Paste your code here..."
                  placeholderTextColor="#4b5563"
                  multiline
                  style={{
                    textAlignVertical: "top",
                    backgroundColor: colors.input,
                    color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 1,
                  }}
                  className="rounded-2xl px-4 py-4 min-h-[150px] font-mono"
                />
              </View>

              {/* Action Button */}
              <Pressable
                onPress={ask}
                disabled={loading}
                style={({ pressed }) => ({
                  backgroundColor: pressed
                    ? colors.accent
                    : colors.accentStrong || "#db2777",
                  shadowColor: colors.accentStrong,
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                })}
                className="rounded-2xl py-4 items-center"
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg">
                    Send to Mentor
                  </Text>
                )}
              </Pressable>
            </View>
          </View>

          {/* Answer Section */}
          {answer ? (
            <View
              className="mt-6 rounded-3xl p-5 shadow-lg border"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center mb-2">
                <View className="w-2 h-2 rounded-full bg-purple-400 mr-2" />
                <Text className="text-purple-300 font-bold uppercase text-xs">
                  Solution
                </Text>
              </View>
              <Text style={{ color: colors.text }} className="leading-6">
                {answer}
              </Text>
            </View>
          ) : (
            <View className="mt-8 items-center opacity-40">
              <Text className="text-gray-500 italic text-center">
                Select a project to see active tasks
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
