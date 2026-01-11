import React, { useEffect, useState } from "react";
import { AuthContext } from "./../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase/firebase-init";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const registerInfo = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginInfo = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOutInfo = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfileInfo = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };
  //observe the manage user state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Auth State Changed:", currentUser?.email || "No user");
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  const authInfo = {
    registerInfo,
    loginInfo,
    loginInGoogle,
    updateUserProfileInfo,
    logOutInfo,
    loading,
    setUser,
    setLoading,
    user,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
