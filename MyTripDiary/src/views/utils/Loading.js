/**
 * A React component that displays an ActivityIndicator in the center of the screen, within a Layout container.
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} - A React component with an ActivityIndicator wrapped in a Layout container.
 */
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";

export default function ({ navigation }) {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* This text using ubuntu font */}
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    </Layout>
  );
}
