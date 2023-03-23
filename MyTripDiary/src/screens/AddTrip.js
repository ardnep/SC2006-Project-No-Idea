import React from "react";
import { Modal, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    Layout,
    TopNav,
    Text,
    themeColor,
    useTheme,
    TextInput,
    component,
    Picker,
    Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

/**
 * Displays the AddTripView window onto the screen of the user
 * @param {Object} navigation 
 */
export default function ({ navigation }) {
    const { isDarkmode, setTheme } = useTheme();
    const [nameOfTrip, setNameOfTrip] = React.useState('');
    const [startLocation, setStartLocation] = React.useState('');
    const [endLocation, setEndLocation] = React.useState('');
    const [pickerValue, setPickerValue] = React.useState(null);
    const [carParkViewVisible, setCarParkViewVisible] = React.useState(false);
    const [routeShowerVisible, setRouteShowerVisible] = React.useState(false);
    const items = [
        { label: 'Private Car', value: 'Car' },
        { label: 'Public Transport', value: 'Public' },
        { label: 'Taxi', value: 'Taxi' },
    ];
    return (
        <Layout style={{ flexDirection: 'column' }}>
            <Modal animationType="slide"
                transparent={true}
                visible={carParkViewVisible}
                onRequestClose={() => {
                    setCarParkViewVisible(!carParkViewVisible);
                }}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    width: '100%',
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 35,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Text style={{ fontWeight: "bold", fontFamily: "Ubuntu_400Regular" }}>Carpark Availability</Text>
                            <Button text={<Ionicons
                                name="close"
                                size={20}
                            />} color="red" size="sm" onPress={() => setCarParkViewVisible(!carParkViewVisible)} />
                        </View>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide"
                transparent={true}
                visible={routeShowerVisible}
                onRequestClose={() => {
                    setRouteShowerVisible(!routeShowerVisible);
                }}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    width: '100%',
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 35,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 150 }}>
                            <Text style={{ fontWeight: "bold", fontFamily: "Ubuntu_400Regular" }}>Route</Text>
                            <Button text={<Ionicons
                                name="close"
                                size={20}
                            />} color="red" size="sm" onPress={() => setRouteShowerVisible(!routeShowerVisible)} />
                        </View>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                        <Text>Some Map Diagram here</Text>
                    </View>
                </View>
            </Modal>
            <TopNav
                middleContent="Add Trip"
                leftContent={
                    <Ionicons
                        name="chevron-back"
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.black}
                    />
                }
                leftAction={() => navigation.goBack()}
            />
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 20,
                }}
            >
                {/* This text using ubuntu font */}
                <Text fontWeight="bold">Name of the Trip</Text>
                <TextInput
                    placeholder="Enter your text"
                    value={nameOfTrip}
                    onChangeText={(val) => setNameOfTrip(val)}
                />
                <Text fontWeight="bold">Start Location</Text>
                <View style={{
                    backgroundColor: component[isDarkmode ? 'dark' : 'light'].textInput.backgroundColor,
                    borderColor: component[isDarkmode ? 'dark' : 'light'].textInput.borderColor,
                    borderWidth: 1,
                    borderRadius: 8,
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <GooglePlacesAutocomplete
                        placeholder="Search"
                        suppressDefaultStyles={true}
                        styles={{
                            flex: 1,
                            color: component[isDarkmode ? 'dark' : 'light'].textInput.color,
                            paddingVertical: 10,
                            fontFamily: "Ubuntu_400Regular",
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        query={{
                            key: '',
                            language: 'en',
                        }}
                    />
                </View>
                <Text fontWeight="bold">End Location</Text>
                <View style={{
                    backgroundColor: component[isDarkmode ? 'dark' : 'light'].textInput.backgroundColor,
                    borderColor: component[isDarkmode ? 'dark' : 'light'].textInput.borderColor,
                    borderWidth: 1,
                    borderRadius: 8,
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <GooglePlacesAutocomplete
                        placeholder="Search"
                        suppressDefaultStyles={true}
                        styles={{
                            flex: 1,
                            color: component[isDarkmode ? 'dark' : 'light'].textInput.color,
                            paddingVertical: 10,
                            fontFamily: "Ubuntu_400Regular",
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        query={{
                            key: '',
                            language: 'en',
                        }}
                    />
                </View>
                <Text fontWeight="bold">Mode of Transport</Text>
                <Picker
                    items={items}
                    value={pickerValue}
                    placeholder="Choose your mode of Transport"
                    onValueChange={(val) => {
                        console.log(val)
                        if (val == "Car") {
                            setCarParkViewVisible(true);
                        } else {
                            setRouteShowerVisible(true);
                        }
                    }}
                />
                <Button text="Add Trip" onPress={() => console.log('Button tapped')} />
            </View>
        </Layout>
    );
}

export default function ({ navigation }) {
    const { isDarkmode, setTheme } = useTheme();
    const [nameOfTrip, setNameOfTrip] = React.useState('');
    const [startLocation, setStartLocation] = React.useState('');
    const [endLocation, setEndLocation] = React.useState('');
    return (
        <Layout style={{ flexDirection: 'column' }}
        >
            <TopNav
                middleContent="Add Trip"
                leftContent={
                    <Ionicons
                        name="chevron-back"
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.black}
                    />
                }
                leftAction={() => navigation.goBack()}
            />
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 20,
                }}
            >
                {/* This text using ubuntu font */}
                <Text fontWeight="bold">Name of the Trip</Text>
                <TextInput
                    placeholder="Enter your text"
                    value={nameOfTrip}
                    onChangeText={(val) => setNameOfTrip(val)}
                />
                <Text fontWeight="bold">Start Location</Text>
                <TextInput
                    placeholder="Enter your text"
                    value={startLocation}
                    onChangeText={(val) => setStartLocation(val)}
                />
                <Text fontWeight="bold">End Location</Text>
                <TextInput
                    placeholder="Enter your text"
                    value={endLocation}
                    onChangeText={(val) => setEndLocation(val)}
                />
                <GooglePlacesAutocomplete
                    placeholder="Search This sisiisis"
                    minLength={2}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyCrky0_IHJW4TyxQmIUa9oz_jkGIvNki8Y',
                        language: 'en',
                    }}
                />
            </View>
        </Layout>
    );
}