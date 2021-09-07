import React from "react";

const AuthContext = React.createContext({
  authToken: null,
  signUp: null,
  isLoginModalOpen: false,
  toggleLoginModalState: null,
  signInWithEmailPassword: null,
  signInWithGoogle: null,
  signOut: null,
  isUserRegistered: null,
  user: null,
  cart: null,
  updateUserInfo: null,
  addProductToCart: null,
  deleteWishlistItem: null,
  addItemToWishlist: null,
  updateCart: null,
});

export default AuthContext;
