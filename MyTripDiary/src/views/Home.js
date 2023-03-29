import React from "react";
import { View, Linking, Pressable } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";

import { updateData, addData, getDataByCollection, getDataWithinSubCollection, fetchAllTrips } from "../controllers/DataController";
import { getAllSavedTrips } from "../controllers/SavedTripsController";
import { getCurrentUserId } from "../controllers/FirebaseController";
import { populateDB } from "../helpers/DatabaseFeeder";

/**
 * Represents a screen component for displaying saved trips and navigating to trip-related screens.
 * @param {object} navigation - The navigation object from React Navigation.
 * @returns {JSX.Element} A JSX element representing the saved trips screen.
 */


export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth(); // Get Firebase auth object
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Pressable onPress={() => navigation.navigate('SavedTrips')}>
          <Section>
            <SectionContent>
              <Text fontWeight="bold" style={{ textAlign: "center" }}>
                Saved Trips
              </Text>
              <Button
                style={{ marginTop: 10 }}
                text="Google Maps"
                status="info"
                onPress={() => Linking.openURL("https://www.google.com/maps")}
              />
              <Button
                text="Trip 1"
                onPress={
                  () => {
                    // console.log(getAllSavedTrips());
                  }}

                style={{
                  marginTop: 10,
                }}
              />
              <Button
                text="Trip 2"
                onPress={() => {
                  navigation.navigate("TripInfo");
                }}
                style={{
                  marginTop: 10,
                }}
              />
              <Button
                text="Saved Trips"
                onPress={() => {
                  navigation.navigate("SavedTrips");
                }}
                style={{
                  marginTop: 10,
                }}
              />
              <Button
                text="Trip History"
                onPress={() => {
                  navigation.navigate("TripHistory");
                }}
                style={{
                  marginTop: 10,
                }}
              />
            </SectionContent>
          </Section>
        </Pressable>
      </View>
    </Layout>
  );
}
