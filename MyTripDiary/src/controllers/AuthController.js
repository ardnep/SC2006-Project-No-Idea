import React, { createContext, useState, useEffect } from "react";
import {firebaseAuth} from "../controllers/FirebaseController";
import { fetchAllTrips } from "../controllers/SavedTripsController";

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
  // user null = loading
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    firebaseAuth.onAuthStateChanged(async (u) => {
      //console.log(u)
      if (u) {
        setUser(true);
        setLoaded(1);
        await fetchAllTrips();
        setLoaded(2);
        // getUserData();
      } else {
        setUser(false);
        setLoaded(0);
        // setUserData(null);
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user, loaded
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
