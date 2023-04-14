import { NavigationContainer } from "@react-navigation/native";

import Loading from "./views/utils/Loading";
import Auth from "./navigators/AuthNavigator";
import Main from "./navigators/MainTabsNavigator";

import { AuthContext } from "./controllers/AuthController";

import React, { useContext } from "react";

/**
 * A function component that renders a NavigationContainer containing
 * the app's main components based on the current user's authentication status.
 * @return {JSX.Element} A NavigationContainer component containing Loading, Auth or Main components based on the user's authentication status.
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
