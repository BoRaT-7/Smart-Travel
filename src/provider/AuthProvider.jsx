// src/provider/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

const API_BASE = "http://localhost:5000/api/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase listener + localStorage fallback
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          provider: "google",
        };
        setUser(mappedUser);
        localStorage.setItem("user", JSON.stringify(mappedUser));
      } else {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Backend registration
  const createNewUser = async (name, email, password) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Register failed:", res.status, text);
      throw new Error("Registration request failed");
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }

    const backendUser = {
      id: data.user?.id,
      name: data.user?.name || name,
      email: data.user?.email || email,
      provider: "backend",
    };
    localStorage.setItem("user", JSON.stringify(backendUser));
    setUser(backendUser);

    return data;
  };

  // Backend email/password login
  const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Login failed:", res.status, text);
      throw new Error("Login request failed");
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    if (data.user) {
      const backendUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        provider: "backend",
      };
      localStorage.setItem("user", JSON.stringify(backendUser));
      setUser(backendUser);
    }

    return data.user;
  };

  // Google login (Firebase)
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const mappedUser = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      provider: "google",
    };

    localStorage.setItem("user", JSON.stringify(mappedUser));
    setUser(mappedUser);

    return mappedUser;
  };

  // LOGOUT (Firebase + local)
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (_) {
      // ignore
    }
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        createNewUser,
        loginUser,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
