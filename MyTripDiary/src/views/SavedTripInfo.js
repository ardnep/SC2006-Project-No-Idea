import { Ionicons } from "@expo/vector-icons";
import { Alert, Modal, StyleSheet } from "react-native";
import { Button, Layout, Section, SectionContent, Text, TextInput, TopNav, useTheme } from "react-native-rapi-ui";
import { deleteSavedTrip, renameSavedTrip } from "../controllers/SavedTripsController";
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { MAPS_API_KEY } from "@env";
import { useState } from "react";

/**
 * Displays information about a saved trip and allows the user to interact with it.
 * @param {object} props
 * @param {object} props.route - The route object containing information about the current route.
 * @param {object} props.navigation - The navigation object
 * @returns {JSX.Element} - Screen
 */

function SavedTripInfo({ route, navigation }) {
    const { isDarkmode } = useTheme();
    const { trip, updateSavedTrips } = route.params;
    const [name, setName] = useState(trip.name);
    const [modalVisible, setModalVisible] = useState(false);
    const origin = { latitude: trip.srcLat, longitude: trip.srcLong };
    const destination = { latitude: trip.destLat, longitude: trip.destLong };
    const handleNameChange = (value) => {
        setName(value);
    };
    const handleSubmit = () => {
        renameSavedTrip(trip, name);
        setModalVisible(false);
        updateSavedTrips();
    };
    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent={name}
            />
            <Section>
                <SectionContent>
                    <Text>From: {trip.srcName}</Text>
                    <Text>To: {trip.destName}</Text>
                </SectionContent>
                <MapView
                    initialRegion={getIntitialRegion(origin, destination)}
                    style={{minHeight:500}}
                >
                    <Marker coordinate={origin} pinColor="#89CFF0"/>
                    <Marker coordinate={destination}/>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={MAPS_API_KEY}
                        strokeWidth={5}
                        strokeColor="#6495ED"
                    />
                </MapView>
                <SectionContent style={styles.buttonSection}>
                    <Button text="Delete" status="danger" style={styles.button} onPress={() => { confirmDelete(trip, navigation, updateSavedTrips) }} />
                    <Button text="Edit" status="primary" style={styles.button} onPress={() => { setModalVisible(true) }} />
                    <Button text="Start" status="primary" style={styles.button} />
                </SectionContent>
                <Modal visible={modalVisible} animationType="slide">
                    <Section style = {styles.editTripNameContainer}>
                        <Text style={styles.text}>Enter new name:</Text>
                        <TextInput
                            value={name}
                            onChangeText={handleNameChange}
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                        />
                        <SectionContent style={styles.buttonSection}>
                            <Button text="Confirm" onPress={handleSubmit} style={styles.button}/>
                            <Button text="Cancel" onPress={() => setModalVisible(false)} style={styles.button}/>
                        </SectionContent>
                    </Section>
                </Modal>
            </Section>       
        </Layout >
    )
}

const confirmDelete = (trip, navigation, updateSavedTrips) => {
    Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this saved trip?',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => { deleteSavedTrip(trip); updateSavedTrips(); navigation.goBack() },
                style: 'destructive',
            },
        ],
        { cancelable: false }
    );
}

export const getIntitialRegion = (origin, destination) => {
    let minLat = Math.min(origin.latitude, destination.latitude);
    let maxLat = Math.max(origin.latitude, destination.latitude);
    let minLng = Math.min(origin.longitude, destination.longitude);
    let maxLng = Math.max(origin.longitude, destination.longitude);
    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;
    const deltaLat = (maxLat - minLat);
    const deltaLng = (maxLng - minLng);
    return {
        latitude: midLat, longitude: midLng,
        latitudeDelta: deltaLat*1.2, longitudeDelta: deltaLng*1.2,
    };
}

/**
 * The styles for the `SavedTripInfo` component.
 */

const styles = StyleSheet.create({
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        marginHorizontal: 4
    },
    editTripNameContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text: {
        marginBottom: 10
    }
})

export default SavedTripInfo;
