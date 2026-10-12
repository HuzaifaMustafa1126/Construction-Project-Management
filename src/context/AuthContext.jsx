import { createContext, useContext, useEffect, useState } from "react";

import {
  login as loginApi,
  logout as logoutApi,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = sessionStorage.getItem("auth_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        sessionStorage.removeItem("auth_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    function clearUser() {
      setUser(null);
    }

    window.addEventListener("auth-expired", clearUser);
    initializeAuth();
    return () => window.removeEventListener("auth-expired", clearUser);
  }, []);

  const login = async (email, password) => {
    const result = await loginApi(email, password);
    setUser(result.user);
    return result.user;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
