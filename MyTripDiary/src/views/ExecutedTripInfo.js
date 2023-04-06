import { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { Button, Layout, Section, SectionContent, Text, TextInput, TopNav, useTheme } from "react-native-rapi-ui";
import { getIntitialRegion } from "./SavedTripInfo";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import { getTime } from "./TripHistory";
import { editExecutedTripPrice } from "../controllers/SavedTripsController";

function ExecutedTripInfo({ route, navigation }) {
    const { isDarkmode } = useTheme();
    const { item, trip, updateGroupedTrips } = route.params;
    const [price, setPrice] = useState(item.tripPrice);
    const [modalVisible, setModalVisible] = useState(false);
    const origin = { latitude: trip.srcLat, longitude: trip.srcLong };
    const destination = { latitude: trip.destLat, longitude: trip.destLong };
    const handlePriceChange = (value) => {
        setPrice(Number(value));
    };
    const handleSubmit = () => {
        editExecutedTripPrice(item, price);
        setModalVisible(false);
        updateGroupedTrips();
    };
    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent={trip.name}
            />
            <Section>
                <SectionContent>
                    <Text>{getTime(item.timeStamp.seconds)} - {getTime(item.timeStamp.seconds+item.duration*60)} </Text>
                    <Text>{trip.srcName} to {trip.destName}</Text>
                </SectionContent>
                <MapView
                    initialRegion={getIntitialRegion(origin, destination)}
                    style={{minHeight:500}}
                >
                    <Marker coordinate={origin} pinColor="#89CFF0"/>
                    <Marker coordinate={destination}/>
                </MapView>
                <SectionContent style={styles.buttonSection}>
                    <Button text="Edit Price" status="primary" style={styles.button} onPress={() => { setModalVisible(true) }} />
                </SectionContent>
                <Modal visible={modalVisible} animationType="slide">
                    <Section style = {styles.editTripNameContainer}>
                        <Text style={styles.text}>Enter new price:</Text>
                        <TextInput
                            value={price}
                            onChangeText={handlePriceChange}
                            keyboardType="numeric"
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
