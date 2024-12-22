/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  const [loading, setLoading] = useState(true);
  //   Register with Email
  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Login With Email
  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Update Profile
  const handleName = (name, profile) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profile,
    });
  };
  //   Google Login
  const googleProvider = new GoogleAuthProvider();
  const handleLoginGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  //   Reset Password
  const handleReseTPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // Logout
  const logOut = () => {
    return signOut(auth).then(() => {
      console.log("user logout");
    });
  };

  const authInfo = {
    handleRegister,
    handleLogin,
    handleLoginGoogle,
    handleName,
    logOut,
    user,
    setUser,
    loading,
    setLoading,
    handleReseTPassword,
  };
  // Unsubcribe
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unSubcribe();
    };
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
