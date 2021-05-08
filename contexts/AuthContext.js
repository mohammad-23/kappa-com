import React from "react";

const AuthContext = React.createContext({
  authToken: null,
  signUp: null,
  signInWithEmailPassword: null,
  signInWithGoogle: null,
  signOut: null,
  isUserRegistered: null,
  user: null,
  updateUserAndToken: null,
  updateToken: null,
  loadingUserInfo: null,
  updateUserInfo: null,
});

export default AuthContext;
