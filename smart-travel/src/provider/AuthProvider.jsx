import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const createNewUser = (email, password, firstName) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        return updateProfile(res.user, { displayName: firstName }).then(() => {
          setUser({ ...res.user, displayName: firstName, photoURL: null });
          return res.user;
        });
      });
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        setUser({ ...res.user, photoURL: null }); // default icon for email login
        return res.user;
      });
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then(res => {
        setUser(res.user); // Google user has photoURL
        return res.user;
      });
  };

  const logout = () => signOut(auth).then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, setUser, createNewUser, loginUser, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
