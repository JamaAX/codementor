import { useEffect, useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { useTheme } from "../context/ThemeContext";

export default function History() {
  const { token } = useAuth();
  const { colors } = useTheme();
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => {
      const blob =
        `${item.question || ""} ${item.answer || ""} ${item.code || ""}`.toLowerCase();
      return blob.includes(term);
    });
  }, [items, search]);

  const load = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const res = await api.get("/qa", token);
      setItems(res.items || []);
    } catch (err) {
      console.warn("History fetch failed", err.message);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View
        style={{ backgroundColor: colors.accent }}
        className="pt-12 pb-10 px-6 rounded-b-[40px]"
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-3xl font-bold">History</Text>
            <Text className="text-purple-200 mt-1">
              Review your mentor answers
            </Text>
          </View>
          <View className="bg-white/10 p-3 rounded-2xl">
            <Text className="text-white font-bold">{items.length}</Text>
          </View>
        </View>

        <View
          className="mt-4 rounded-2xl px-4 py-3"
          style={{
            backgroundColor: colors.input,
            borderColor: colors.border,
            borderWidth: 1,
          }}
        >
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search past questions, answers, or code..."
            placeholderTextColor="#9ca3af"
            style={{ color: colors.text }}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={load}
            tintColor="#db2777"
          />
        }
      >
        <Text
          style={{ color: colors.sub }}
          className="uppercase text-xs font-bold tracking-widest mb-6"
        >
          Recent Inquiries
        </Text>

        {loading ? (
          <View className="items-center py-6">
            <ActivityIndicator color="#c084fc" />
          </View>
        ) : null}

        {filtered.length === 0 && !loading ? (
          <View
            className="rounded-[32px] p-10 items-center"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            <View className="w-16 h-16 rounded-3xl bg-purple-500/10 items-center justify-center mb-4">
              <Text className="text-3xl">📂</Text>
            </View>
            <Text style={{ color: colors.text }} className="text-lg font-bold">
              No matches found
            </Text>
            <Text style={{ color: colors.sub }} className="text-center mt-2">
              Try adjusting your search or ask a new question.
            </Text>
          </View>
        ) : (
          filtered.map((item) => (
            <View
              key={item._id}
              className="rounded-[32px] p-5 mb-4 shadow-xl"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
              }}
            >
              <View className="flex-row items-start gap-4">
                {/* Round Icon matching the image style */}
                <View className="w-14 h-14 rounded-2xl bg-[#8b5cf6] items-center justify-center">
                  <Text className="text-white text-xl font-bold">{"</>"}</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row justify-between items-start">
                    <Text
                      style={{ color: colors.text }}
                      className="text-lg font-bold flex-1 mr-2"
                      numberOfLines={1}
                    >
                      {item.question}
                    </Text>
                    <Text className="text-[10px] text-gray-500 font-mono mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text
                    style={{ color: colors.sub }}
                    className="text-sm mt-1"
                    numberOfLines={2}
                  >
                    {item.answer}
                  </Text>
                </View>
              </View>

              {/* Progress Bar visual matching the image */}
              <View className="mt-5">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                    Response Clarity
                  </Text>
                  <Text className="text-pink-500 text-[10px] font-bold">
                    100%
                  </Text>
                </View>
                <View
                  className="h-1.5 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: colors.border }}
                >
                  <View className="h-full bg-purple-500 w-[100%]" />
                </View>
              </View>

              {/* Tag style matching the image bottom row */}
              <View className="flex-row items-center justify-between mt-4">
                <View className="flex-row gap-2">
                  <View className="bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    <Text className="text-purple-400 text-[10px] font-bold">
                      REPLY
                    </Text>
                  </View>
                  {item.code && (
                    <View className="bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                      <Text className="text-pink-500 text-[10px] font-bold">
                        CODE
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-gray-600 text-[10px]">
                  ID: {item._id.slice(-5)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
