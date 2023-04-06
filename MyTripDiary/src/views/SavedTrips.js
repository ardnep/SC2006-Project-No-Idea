import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Layout, Section, SectionContent, Text, TopNav, useTheme } from "react-native-rapi-ui";
import { getAllSavedTrips, starTrip } from "../controllers/SavedTripsController";

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
        const togglePin = (trip) => {
            starTrip(trip);
            updateSavedTrips();
        };
        return (
            <Pressable onLongPress={() => togglePin(trip)} onPress={() => { navigation.navigate("SavedTripInfo", { trip, updateSavedTrips }) }}>
                <Section style={styles.section}>
                    <View style={styles.tripTitle}>
                        {trip.pinned ? <AntDesign
                            name={"pushpin"}
                            color={"orange"}
                            size={20}
                            onPress={() => { togglePin(trip); }}
                        /> : null}
                        <Text>{trip.name}</Text>
                    </View>
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
                rightAction={() => { navigation.navigate("AddSavedTrip", { updateSavedTrips }) }}
            />
            <FlatList
                data={savedTripsArray.sort((a, b) => (b.pinned ? 1 : -1))}
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
        alignItems: 'center',
        flexDirection: 'column'
    },

    tripTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})

export default SavedTrips;
