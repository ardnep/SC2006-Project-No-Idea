/**
 * @fileoverview A loading component that displays a spinner animation while content is being loaded.
 * @module views/utils/Loading
 * @function
 * @returns {JSX.Element} The rendered Loading component.
 */

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";

export default function Loading() {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    </Layout>
  );
}
