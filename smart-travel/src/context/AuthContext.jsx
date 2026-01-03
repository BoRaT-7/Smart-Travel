// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext(null);

// Admin এর জন্য আলাদা provider
export const AdminAuthProvider = ({ children }) => {
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
    setToken(jwtToken || "");
  };

  const logout = () => {
    setAdmin(null);
    setToken("");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// hook
export const useAdminAuth = () => useContext(AdminAuthContext);
