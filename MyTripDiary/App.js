/**
@fileOverview This is the main entry file for the React Native application.
@module App
@requires React
@requires AuthProvider from ./src/controllers/AuthController
@requires ThemeProvider from react-native-rapi-ui
@requires LogBox from react-native
@requires System from ./src/System
*/

import React from "react";
import { AuthProvider } from "./src/controllers/AuthController";
import { ThemeProvider } from "react-native-rapi-ui";
import { LogBox } from "react-native";
import System from "./src/System";

/**
The main entry function for the React Native application.
@function
@name App
@returns {JSX.Element} The rendered React component
*/
export default function App() {
  const images = [
    require("./assets/icon.png"),
    require("./assets/splash.png"),
    require("./assets/login.png"),
    require("./assets/register.png"),
    require("./assets/forget.png"),
  ];

  // Ignore firebase v9 AsyncStorage warning
  React.useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ]);
  }, []);
  return (
    <ThemeProvider images={images}>
      {
        <AuthProvider>
          <System />
        </AuthProvider>
      }
    </ThemeProvider>
  );
}
