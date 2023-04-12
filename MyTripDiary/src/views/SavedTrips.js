import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, View, TouchableOpacity, TouchableNativeFeedback } from "react-native";

import { Layout, Section, SectionContent, Text, TopNav, useTheme } from "react-native-rapi-ui";

import { getAllActiveSavedTrips, starTrip } from "../controllers/SavedTripsController";

import { themeColor } from "react-native-rapi-ui";

import styles from "../styles/main";

/**
 * Renders a list of saved trips, allowing the user to select and view them.
 * @param {object} props
 * @param {object} props.navigation - The navigation object
 * @returns {JSX.Element} - Screen
 */



function SavedTrips({ navigation }) {
    const [savedTripsArray, setSavedTripsArray] = useState(getAllActiveSavedTrips());
    const [actionMenu, setActionMenu] = useState(false);
    const { isDarkmode } = useTheme();

    function updateSavedTrips() {
        setSavedTripsArray([...getAllActiveSavedTrips()]);
    }

    const TouchableComponent = (props) => {
        // Check if the current OS is Android
        if (Platform.OS === 'android') {
          return (
            <TouchableNativeFeedback {...props}>
            </TouchableNativeFeedback>
          );
        } else {
          return (
            <TouchableOpacity {...props}>
            </TouchableOpacity>
          );
        }
    };

    const MenuItems = [
        { text: 'Actions', icon: 'home', isTitle: true, onPress: () => { } },
        { text: 'Action 1', icon: 'edit', onPress: () => { } },
        { text: 'Action 2', icon: 'map-pin', withSeparator: true, onPress: () => { } },
        { text: 'Action 3', icon: 'trash', isDestructive: true, onPress: () => { } },
    ];

    const renderSavedTrip = ({ item }) => {
        const trip = item;
        const togglePin = (trip) => {
            starTrip(trip);
            updateSavedTrips();
        };

        return (
            
            // <HoldItem items={MenuItems}>
            <TouchableComponent onLongPress={() => {

                togglePin(trip);
                // setActionMenu(true);

            }} onPress={() => { navigation.navigate("SavedTripInfo", { trip, updateSavedTrips }) }}>
                <Section style={styles.section}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleContainerMiddleContent}>
                            <Text fontWeight="bold">{trip.name}</Text>
                        </View>
                        <View style={styles.titleContainerRightContent}>
                            {trip.pinned ? <AntDesign
                                style={styles.pinIcon}
                                name={"star"}
                                color={themeColor.primary}
                                size={20}
                                onPress={() => { togglePin(trip); }}
                            /> : null}
                        </View>
                    </View>
                    <SectionContent>
                        <Text>{trip.srcName} to {trip.destName}</Text>
                    </SectionContent>
                </Section>
            </TouchableComponent>
        )
    }

    return (
        <Layout>
            <TopNav
                // leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                // leftAction={navigation.goBack}
                middleContent="Saved Trips"
                rightContent={<Text size="md"><AntDesign
                    name={"pluscircle"}
                    size={20} /></Text>}
                rightAction={() => { navigation.navigate("AddSavedTrip", { updateSavedTrips }) }}
            />
            <FlatList
                data={savedTripsArray.sort((a, b) => (b.pinned ? 1 : -1))}
                renderItem={renderSavedTrip}
            />
            {actionMenu ?
                <View style={styles.actionMenu}>
                </View>
                : null}
        </Layout>
    )
}

export default SavedTrips;
