/**
 * @fileOverview This file contains the AuthProvider component, which is a context provider for managing user authentication state.
 * @module controllers/AuthController
 */

import React, { createContext, useState, useEffect } from "react";
import { firebaseAuth } from "./FirebaseController";
import { fetchAllTrips } from "./SavedTripsController";

/**
 * @external AuthContext
 * @typedef {object} AuthContext
 * @property {boolean|null} user - The current authenticated user, or null if not logged in.
 * @property {number} loaded - The loading status of the authentication, represented as a number: 0 for not loaded, 1 for loading, and 2 for loaded.
 */

/**
 * @function
 * @name AuthProvider
 * @description The AuthProvider component is a context provider for managing user authentication state.
 * @param {object} props - The properties to be passed to the AuthProvider component.
 * @returns {JSX.Element} - The JSX element representing the AuthProvider component.
 */
const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    checkLogin();
  }, []);

  /**
   * @function
   * @name checkLogin
   * @description A helper function to check the login status of the user.
   * @returns {void}
   */
  function checkLogin() {
    firebaseAuth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(true);
        setLoaded(1);
        await fetchAllTrips();
        setLoaded(2);
      } else {
        setUser(false);
        setLoaded(0);
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loaded,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

/**
 * The Auth context that can be used by other components
 * @type {Object}
 */
export const AuthContext = createContext(null);

export { AuthProvider };
