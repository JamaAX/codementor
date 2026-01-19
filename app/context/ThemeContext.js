import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeWindStyleSheet } from "nativewind";

const ThemeContext = createContext();

const light = {
  scheme: "light",
  bg: "#f9fafb",
  card: "#ffffff",
  text: "#0f172a",
  sub: "#475569",
  border: "#e5e7eb",
  input: "#f1f5f9",
  accent: "#7c3aed",
  accentStrong: "#a855f7",
};

const dark = {
  scheme: "dark",
  bg: "#0b0b12",
  card: "#111222",
  text: "#ffffff",
  sub: "#9ca3af",
  border: "#1f2937",
  input: "#0f111a",
  accent: "#a855f7",
  accentStrong: "#c084fc",
};

export function ThemeProvider({ children }) {
  const [scheme, setScheme] = useState("dark");

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("theme_scheme");
        if (stored === "light" || stored === "dark") {
          applyScheme(stored);
          setScheme(stored);
        } else {
          applyScheme("dark");
        }
      } catch (err) {
        console.warn("Theme load failed", err);
      }
    })();
  }, []);

  const applyScheme = (nextScheme) => {
    try {
      NativeWindStyleSheet.setColorScheme(nextScheme);
    } catch (err) {
      // noop if unavailable
    }
  };

  const toggle = async () => {
    const next = scheme === "dark" ? "light" : "dark";
    setScheme(next);
    applyScheme(next);
    try {
      await AsyncStorage.setItem("theme_scheme", next);
    } catch (err) {
      console.warn("Theme save failed", err);
    }
  };

  const value = useMemo(
    () => ({
      scheme,
      isDark: scheme === "dark",
      colors: scheme === "dark" ? dark : light,
      toggle,
    }),
    [scheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
