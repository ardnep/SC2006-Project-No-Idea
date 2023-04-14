import React, { useEffect } from "react";

import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import {
  getUserDisplayName,
  userSignOut,
} from "../../controllers/FirebaseController";
import { Layout, TopNav, Text } from "react-native-rapi-ui";

import { useTheme } from "react-native-rapi-ui";
import eventBus from "../../models/EventBus";

/**
 * Displays the Settings app onto the screen
 */
export default function Settings({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  const [displayName, setDisplayName] = React.useState(getUserDisplayName());

  useEffect(() => {
    const handleEvent = () => {
      setDisplayName(getUserDisplayName());
    };
    eventBus.subscribe("updateDisplayName", handleEvent);
    return () => {
      eventBus.unsubscribe("updateDisplayName", handleEvent);
    };
  }, []);

  return (
    <Layout>
      <TopNav middleContent="Settings" />
      <Image
        style={styles.icon}
        source={require("../../../assets/profile-user.png")}
      />
      <View
        style={{
          height: "10%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text>{displayName || "N/A"}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AccountSettings");
        }}
      >
        <Text style={styles.optionText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setTheme(isDarkmode ? "light" : "dark");
        }}
      >
        <Text style={styles.optionText}>
          {isDarkmode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          userSignOut();
        }}
      >
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.ver}>Ver 1.0</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginTop: 30,
    width: 150,
    height: 150,
  },
  optionText: {
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "normal",
  },
  ver: {
    marginTop: 50,
    textAlign: "center",
  },
});
