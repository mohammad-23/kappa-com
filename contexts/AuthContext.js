import React from "react";

const AuthContext = React.createContext({
  authToken: null,
  signUp: null,
  signInWithEmailPassword: null,
  signInWithGoogle: null,
  signOut: null,
  isUserRegistered: null,
  user: null,
  cart: null,
  updateUserInfo: null,
  updateCart: null,
});

export default AuthContext;
