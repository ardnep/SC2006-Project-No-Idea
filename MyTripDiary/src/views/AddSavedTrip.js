import { Ionicons } from "@expo/vector-icons";
import { Button, Layout, Section, Text, TextInput, TopNav, useTheme } from "react-native-rapi-ui";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { addSavedTrip } from "../controllers/SavedTripsController";
import { Trip } from "../models/Trip";
import { MAPS_API_KEY } from "@env";
import { generateTripID } from "../controllers/FirebaseController";

function AddSavedTrip({ route, navigation }) {
    const [name, setName] = React.useState('');
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const { updateSavedTrips } = route.params;
    const { isDarkmode } = useTheme();

    const SaveTrip = (origin, destination) => {
        if (name == '' || !origin || !destination) {
            Alert.alert('Error', 'Please fill in the fields');
            return;
        }
        addSavedTrip(new Trip(generateTripID(), name, ...origin, ...destination, 0));
        updateSavedTrips();
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
            <Section>
                <Button
                    text="Add to Saved Trips"
                    status="primary"
                    onPress={() => SaveTrip(origin, destination)}
                />
            </Section>
        </Layout>
    )
}

const GooglePlacesInput = ({ placeholder, setLocation }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            query={{
                key: MAPS_API_KEY,
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

export default AddSavedTrip