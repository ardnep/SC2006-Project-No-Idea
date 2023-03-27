import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

/**
 * 
 * @typedef {Object} AuthContextValue - An object containing the current user state.
 * @property {boolean} user - The current user's authentication state.
 * @typedef {Object} AuthProviderProps - The props for the AuthProvider component.
 * @property {React.ReactNode} children - The children components to be wrapped by the AuthProvider.
 * @type {React.Context<AuthContextValue>} - The authentication context object.
 */
const AuthContext = createContext();

/** 
 * The authentication provider component that provides authentication state and 
 * functions to the children components.
 * @param {AuthProviderProps} props - The props for the AuthProvider component.
 */
const AuthProvider = (props) => {
  const auth = firebase.auth();
  // user null = loading
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    firebase.onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true);
        // getUserData();
      } else {
        setUser(false);
        // setUserData(null);
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
