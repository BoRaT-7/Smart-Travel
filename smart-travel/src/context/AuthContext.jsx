// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("adminUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [token]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem("adminUser", JSON.stringify(admin));
    } else {
      localStorage.removeItem("adminUser");
    }
  }, [admin]);

  const login = (user, jwtToken) => {
    setAdmin(user);
    setToken(jwtToken);
  };

  const logout = () => {
    setAdmin(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
