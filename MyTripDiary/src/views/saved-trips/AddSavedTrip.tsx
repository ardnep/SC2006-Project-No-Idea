import { Ionicons } from "@expo/vector-icons";
import { Button, Layout, Text, TextInput, TopNav, useTheme } from "react-native-rapi-ui";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { addSavedTrip } from "../../controllers/SavedTripsController";
import { Trip } from "../../models/Trip";
import { generateTripID } from "../../controllers/FirebaseController";
import eventBus from "../../models/EventBus";

function AddSavedTrip({ route, navigation }) {
    const [name, setName] = React.useState('');
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const { isDarkmode } = useTheme();

    const SaveTrip = (origin, destination) => {
        if (name == '' || !origin || !destination) {
            Alert.alert('Error', 'Please fill in the fields');
            return;
        }

        addSavedTrip(new Trip(false, false, generateTripID(), name, origin[0], origin[1], origin[2], destination[0], destination[1], destination[2], []));
        eventBus.notify('updateSavedTrips', null);

        navigation.goBack();
    }

    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent="Add to Saved Trips"
            />
            <Text style={styles.text}>Trip Name</Text>
            <TextInput
                placeholder="Enter trip name"
                value={name}
                onChangeText={(val) => setName(val)}
            />
            <Text style={styles.text}>Origin Location</Text>
            <GooglePlacesInput
                placeholder='Enter Origin Location'
                setLocation={setOrigin}
            />
            <Text style={styles.text}>Destination Location</Text>
            <GooglePlacesInput
                placeholder='Enter Destination Location'
                setLocation={setDestination}
            />
            <Button
                text="Add to Saved Trips"
                status="primary"
                style={{ alignSelf: 'center', marginTop: "80%" }}
                onPress={() => SaveTrip(origin, destination)}
            />
        </Layout>
    )
}

const GooglePlacesInput = ({ placeholder, setLocation }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            styles={{ container: { flex: 0 } }}
            query={{
                key: process.env.MAPS_API_KEY,
                language: 'en',
                components: 'country:sg'
            }}
            onPress={(data, details) => setLocation([
                data.structured_formatting.main_text,
                details.geometry.location.lat,
                details.geometry.location.lng
            ])}
            fetchDetails={true}
        />
    );
};

const styles = StyleSheet.create({
    text: {
        padding: 8
    }
})

export default AddSavedTrip;