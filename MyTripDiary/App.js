import React from "react";
import { AuthProvider } from "./src/controllers/AuthController";
import { ThemeProvider } from "react-native-rapi-ui";
import { LogBox } from "react-native";
import System from "./src/System";

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
  }, [])
  return (
    <ThemeProvider images={images}>
      {(<AuthProvider>
        <System />
      </AuthProvider>)}
    </ThemeProvider>
  );
}
