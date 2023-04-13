import { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { Button, Layout, Section, SectionContent, Text, TextInput, TopNav, useTheme } from "react-native-rapi-ui";
import { getIntitialRegion } from "./SavedTripInfo";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import { getTime, getDate, getDisplayPrice } from "./TripHistory";
import { editExecutedTripPrice } from "../controllers/SavedTripsController";
import darkMapStyle from '../styles/darkMap.json'

function ExecutedTripInfo({ route, navigation }) {
    const { isDarkmode } = useTheme();
    const { item, trip, updateGroupedTrips } = route.params;
    // const [price, setPrice] = useState(item.tripPrice);
    // const [modalVisible, setModalVisible] = useState(false);
    const origin = { latitude: trip.srcLat, longitude: trip.srcLong };
    const destination = { latitude: trip.destLat, longitude: trip.destLong };
    // const handlePriceChange = (value) => {
    //     setPrice(Number(value));
    // };
    // const handleSubmit = () => {
    //     editExecutedTripPrice(item, price);
    //     setModalVisible(false);
    //     updateGroupedTrips();
    // };
    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent={trip.name}
            />
            <Section>
                <SectionContent>
                    <Text>{getTime(item.timeStamp.seconds)} - {getTime(item.timeStamp.seconds+item.duration*60)} on {getDate(item.timeStamp.seconds)}</Text>
                    <Text>{trip.srcName} to {trip.destName}</Text>
                    <Text>Travelled {item.distance.toFixed(1)}km by {item.modeOfTransport}</Text>
                    <Text>Cost: {getDisplayPrice(item)}</Text>
                </SectionContent>
                <MapView
                    initialRegion={getIntitialRegion(origin, destination)}
                    style={{height:"60%"}}
                    customMapStyle={isDarkmode ? darkMapStyle : []}
                    userInterfaceStyle={isDarkmode ? 'dark' : 'light'}
                >
                    <Marker coordinate={origin} pinColor="#89CFF0"/>
                    <Marker coordinate={destination}/>
                </MapView>
            </Section>       
        </Layout >
    )
}

/**
 * The styles for the `ExecutedTripInfo` component.
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

export default ExecutedTripInfo;
