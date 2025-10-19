import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persistent login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Registration
  const createNewUser = async (email, password, firstName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: firstName });
    await sendEmailVerification(res.user); // Email verification
    setUser({ ...res.user, photoURL: null });
    // Save user in Firestore
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      email: res.user.email,
      displayName: firstName,
      photoURL: null,
      createdAt: new Date()
    });
    return res.user;
  };

  // Login with Email/Password
  const loginUser = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser({ ...res.user, photoURL: null });
    return res.user;
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    setUser(res.user);
    // Save/update user in Firestore
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      lastLogin: new Date()
    }, { merge: true });
    return res.user;
  };

  // Logout
  const logout = () => signOut(auth).then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, setUser, loading, createNewUser, loginUser, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
