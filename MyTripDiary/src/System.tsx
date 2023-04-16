/**
@module System
@description Main entry point for the application.
@returns {React.Component} - The root component of the application.
*/

import { NavigationContainer } from "@react-navigation/native";

import Loading from "./views/utils/Loading";
import Auth from "./navigators/AuthNavigator";
import Main from "./navigators/MainTabsNavigator";

import { AuthContext } from "./controllers/AuthController";

import React, { useContext } from "react";

/**
@function System
@description The root component of the application.
@returns {React.Component} - The root component of the application.
*/

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const loaded = auth.loaded;

  return (
    <NavigationContainer>
      {loaded == 1 && <Loading />}
      {user == false && <Auth />}
      {user == true && loaded == 2 && (
        <>
          <Main />
        </>
      )}
    </NavigationContainer>
  );
};
