import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Register + auto-login
  const createNewUser = (email, password, firstName) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return updateProfile(res.user, { displayName: firstName }).then(() => {
          setUser({ ...res.user, displayName: firstName });
          return res.user;
        });
      });
  };

  // Login
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        setUser(res.user);
        return res.user;
      });
  };

  // Logout
  const logout = () => signOut(auth).then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, setUser, createNewUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
