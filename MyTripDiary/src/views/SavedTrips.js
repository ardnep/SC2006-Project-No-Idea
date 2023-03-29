import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Layout, Section, SectionContent, Text, TopNav, useTheme } from "react-native-rapi-ui";
import { Trip } from "../models/Trip";
import { convertToTripClass, getAllExecutedTrips, getAllSavedTrips } from "../controllers/SavedTripsController";

/**
 * Renders a list of saved trips, allowing the user to select and view them.
 * @param {object} props
 * @param {object} props.navigation - The navigation object
 * @returns {JSX.Element} - Screen
 */

function SavedTrips({ navigation }) {
    const { isDarkmode } = useTheme();

    const savedTripsArray = getAllSavedTrips();

    const renderSavedTrip = ({ item }) => {
        const trip = item;
        return (
            <Pressable onPress={() => { navigation.navigate("SavedTripInfo", { trip }) }}>
                <Section style={styles.section}>
                    <Text>{trip.name}</Text>
                    <SectionContent>
                        <Text>{trip.srcName} to {trip.destName}</Text>
                    </SectionContent>
                </Section>
            </Pressable>
        )
    }
    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent="Saved Trips"
                rightContent={<Text size="md">Add Trip</Text>}
                rightAction={() => { navigation.navigate() }}
            />
            <FlatList
                data={savedTripsArray}
                renderItem={renderSavedTrip}

            />
        </Layout>
    )
}
/**
* the style for the 'SavedTrip' component
*/
const styles = StyleSheet.create({
    section: {
        elevation: 16,
        margin: 8,
        alignItems: 'center'
    }
})

export default SavedTrips;
