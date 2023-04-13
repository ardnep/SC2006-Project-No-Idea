import React, { useState, useEffect } from "react";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Alert, FlatList, Modal, View, TouchableOpacity, TouchableNativeFeedback, StyleSheet } from "react-native";

import { Button, Layout, Section, SectionContent, Text, TextInput, TopNav, useTheme } from "react-native-rapi-ui";

import { getAllActiveSavedTrips, starTrip } from "../controllers/SavedTripsController";

import { themeColor } from "react-native-rapi-ui";
import { deleteSavedTrip, renameSavedTrip } from "../controllers/SavedTripsController";
import styles from "../styles/main";
import eventBus from './eventBus';

/**
 * Renders a list of saved trips, allowing the user to select and view them.
 * @param {object} props
 * @param {object} props.navigation - The navigation object
 * @returns {JSX.Element} - Screen
 */

function SavedTrips({ navigation }) {
    const [savedTripsArray, setSavedTripsArray] = useState(getAllActiveSavedTrips());
    const [popupState, setPopupState] = useState({ selectedTrip: null, visible: false });
    const [tripName, setTripName] = useState("");
    const { isDarkmode } = useTheme();

    const closePopup = () => {
        setPopupState({ selectedTrip: null, visible: false });
    }

    const handleDeleteTrip = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this saved trip?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteSavedTrip(popupState.selectedTrip);
                        updateSavedTrips();
                        Alert.alert(
                            `Trip Deleted`,
                            `${popupState.selectedTrip.name} has been deleted!`
                        )
                        closePopup();
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    }

    const handleStarTrip = () => {
        starTrip(popupState.selectedTrip);
        updateSavedTrips();
        // Alert.alert(
        //     `Trip ${popupState.selectedTrip.pinned ? 'Starred' : 'Un-starred'}`,
        //     `${popupState.selectedTrip.name} has been ${popupState.selectedTrip.pinned ? 'starred' : 'un-starred'}!`
        // );
        closePopup();
    }

    const handleNewNameInput = (value) => {
        setTripName(value);
    };

    const handleTripNameChange = () => {
        const previousName = popupState.selectedTrip.name;
        renameSavedTrip(popupState.selectedTrip, tripName);
        updateSavedTrips();
        Alert.alert(
            `Name Changed Successfully`,
            `${previousName} changed to ${tripName}!`
        );
        eventBus.emit('updateExecutedTrips', null);
        closePopup();
    };

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

    const renderSavedTrip = ({ item }) => {
        const trip = item;

        return (
            <TouchableComponent onLongPress={() => {
                setTripName(trip.name)
                setPopupState({ selectedTrip: trip, visible: true });

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
                middleContent="Saved Trips"
                rightContent={<Text size="md"><AntDesign
                    name={"pluscircle"}
                    size={24}
                    /></Text>}
                rightAction={() => { navigation.navigate("AddSavedTrip", { updateSavedTrips }) }}
            />
            <FlatList
                data={savedTripsArray.sort((a, b) => (b.pinned - a.pinned))}
                renderItem={renderSavedTrip}
            />
            <View style={stylus.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={popupState.visible}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        <Section style={{
                            width: '90%',
                            height: 130,
                            borderColor: isDarkmode ? themeColor.black400 : themeColor.white200,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            elevation: 20,
                            padding: 10,
                            borderRadius: 4,
                        }}>
                            <TextInput
                                value={tripName}
                                onChangeText={handleNewNameInput}
                                style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                            />
                            <SectionContent style={{
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <Button text={<FontAwesome5 name={"pen"} size={16} />} onPress={handleTripNameChange} style={stylus.button} />

                                <Button text={<AntDesign name={"star"} size={16} />} onPress={handleStarTrip} style={stylus.button} />
                                <Button text={<FontAwesome5 name={"trash"} size={16} />} status="danger" style={stylus.button} onPress={handleDeleteTrip} />
                                <Button text={<FontAwesome name={"close"} size={16} />} onPress={closePopup} style={stylus.button} />
                            </SectionContent>
                        </Section>
                    </View>
                </Modal>
            </View>
        </Layout>
    )
}

const stylus = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0
    },
    button: {
        marginHorizontal: 4
    }
});

export default SavedTrips;
