import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Layout, Section, SectionContent, Text, TopNav, useTheme } from "react-native-rapi-ui";
import { getAllSavedTrips } from "../controllers/SavedTripsController";

/**
 * Renders a list of saved trips, allowing the user to select and view them.
 * @param {object} props
 * @param {object} props.navigation - The navigation object
 * @returns {JSX.Element} - Screen
 */

function SavedTrips({ navigation }) {
    const [savedTripsArray, setSavedTripsArray] = useState(getAllSavedTrips());
    const { isDarkmode } = useTheme();

    function updateSavedTrips() {
        setSavedTripsArray([...getAllSavedTrips()]);
    }

    const renderSavedTrip = ({ item }) => {
        const trip = item;
        return (
            <Pressable onPress={() => { navigation.navigate("SavedTripInfo", { trip, updateSavedTrips }) }}>
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
                rightAction={() => { navigation.navigate("AddSavedTrip", {updateSavedTrips}) }}
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
