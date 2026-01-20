import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { api } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("auth_token");
        if (stored) {
          setToken(stored);
          await refreshProfile(stored);
        }
      } catch (err) {
        console.warn("Failed to load token", err);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);
  

  const refreshProfile = async (tokenOverride) => {
    try {
      const authToken = tokenOverride || token;
      if (!authToken) return null;
      const me = await api.get("/auth/me", authToken);
      setUser(me.user);
      return me.user;
    } catch (err) {
      console.warn("Profile fetch failed", err.message);
      // Only logout if token is invalid/expired; otherwise keep session and let retry.
      if (err.status === 401) {
        await logout();
      }
      return null;
    }
  };
  

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await api.post("/auth/login", { email, password });
      await handleAuthSuccess(result);
      return result.user;
    } catch (err) {
      Alert.alert("Login failed", err.message || "Could not login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const result = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      await handleAuthSuccess(result);
      return result.user;
    } catch (err) {
      Alert.alert("Register failed", err.message || "Could not register");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = async (result) => {
    setToken(result.token);
    setUser(result.user);
    await AsyncStorage.setItem("auth_token", result.token);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("auth_token");
  };

  const value = useMemo(
    () => ({
      token,
      user,
      initializing,
      loading,
      login,
      register,
      logout,
      refreshProfile,
    }),
    [token, user, initializing, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
