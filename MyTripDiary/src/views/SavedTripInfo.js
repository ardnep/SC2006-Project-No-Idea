import { Ionicons } from "@expo/vector-icons";
import { Alert, Modal, StyleSheet, ScrollView, View, FlatList } from "react-native";
import { Button, Layout, Section, SectionContent, Text, TextInput, TopNav, useTheme } from "react-native-rapi-ui";
import { deleteSavedTrip, renameSavedTrip } from "../controllers/SavedTripsController";
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import { useState } from "react";
import { RenderHTML } from 'react-native-render-html';
import { FontAwesome5 } from "@expo/vector-icons";
import { getAllTransports, getDefaultTransport } from "../controllers/RouteManager";
import { duration } from "moment";

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
    const [inst, setInst] = useState("");
    const [name, setName] = useState(trip.name);
    const [gmap, setGmap] = useState({});
    const [executionInfo, setExecutionInfo] = useState([]);
    const [transport, setTransportType] = useState(getDefaultTransport());
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [instructionModalVisible, setInstructionModalVisible] = useState(false);
    const origin = { latitude: trip.srcLat, longitude: trip.srcLong };
    const destination = { latitude: trip.destLat, longitude: trip.destLong };
    const handleNameChange = (value) => {
        setName(value);
    };
    const handleSubmit = () => {
        renameSavedTrip(trip, name);
        setEditModalVisible(false);
        updateSavedTrips();
    };
    const renderTransport = ({ item }) => {
        const newTransport = item;
        return (
            <Button text={<FontAwesome5 name={newTransport.displayIcon} size={16}/>} status="primary" style={styles.button} onPress={() => { 
                if(transport.type == newTransport.type){
                    newTransport.getPrice(gmap).then(executionPrice => {
                        setExecutionInfo([gmap.duration,gmap.distance,executionPrice]);
                    });
                }
                setTransportType(newTransport); 
            }} />
        )
    }
    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent={name}
            />
            <Section>
            <Modal visible={editModalVisible} animationType="slide">
                    <Section style = {styles.editTripNameContainer}>
                        <Text style={styles.text}>Enter new name:</Text>
                        <TextInput
                            value={name}
                            onChangeText={handleNameChange}
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                        />
                        <SectionContent style={styles.buttonSection}>
                            <Button text="Confirm" onPress={handleSubmit} style={styles.button}/>
                            <Button text="Cancel" onPress={() => setEditModalVisible(false)} style={styles.button}/>
                        </SectionContent>
                    </Section>
                </Modal>
            <Modal visible={instructionModalVisible} animationType="slide">
                <Section style = {styles.instructions}>
                    <ScrollView>
                        <View>
                            <RenderHTML source={{ html: inst}} />
                        </View>
                    </ScrollView>
                </Section>
                <SectionContent style={styles.buttonSection}>
                <Button text="Close" onPress={() => setInstructionModalVisible(false)} />
                </SectionContent>
            </Modal>
                <SectionContent>
                    <View>
                        <Text>From: {trip.srcName}</Text>
                        <Text>To: {trip.destName}</Text>
                    </View>
                    {executionInfo.length > 0 ? <View>
                         
                            <Text>{Math.round(executionInfo[0])}mins ({executionInfo[1].toFixed(2)}km)</Text>
                            <Text>{executionInfo[2] ? `S$${executionInfo[2]}` : "Free"}</Text>
                    </View> : null}
                </SectionContent>
                <MapView
                    initialRegion={getIntitialRegion(origin, destination)}
                    style={{minHeight:400}}
                >
                    <Marker coordinate={origin} pinColor="#89CFF0"/>
                    <Marker coordinate={destination}/>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        mode={transport.type}
                        apikey={process.env.MAPS_API_KEY}
                        strokeWidth={5}
                        resetOnChange={true}
                        strokeColor={transport.name === 'Taxi' ? "#4491ED" : "#6495ED"}
                        onReady={result => {
                            transport.getPrice(result).then(executionPrice => {
                                setExecutionInfo([result.duration,result.distance,executionPrice]);
                            });
                            let instructions = []
                            result.legs[0].steps.forEach(x => instructions.push(x.html_instructions));
                            setInst(instructions.join("<br>"));
                            setGmap(result);
                        }}
                    />
                </MapView>
                <SectionContent style={styles.buttonSection}>
                    <Button text="Delete" status="danger" style={styles.button} onPress={() => { confirmDelete(trip, navigation, updateSavedTrips) }} />
                    <Button text="Edit" status="primary" style={styles.button} onPress={() => { setEditModalVisible(true) }} />
                    <Button text="Start" status="primary" style={styles.button} />
                </SectionContent>
                <SectionContent style={styles.buttonSection}>
                    {/* <Button text={<FontAwesome5 name={"car"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("DRIVING") }} />
                    <Button text={<FontAwesome5 name={"taxi"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("DRIVING") }} />
                    <Button text={<FontAwesome5 name={"bus-alt"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("TRANSIT") }} />
                    <Button text={<FontAwesome5 name={"bicycle"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("BICYCLING") }} />
                    <Button text={<FontAwesome5 name={"walking"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("WALKING") }} /> */}
                    <FlatList
                            data = {getAllTransports()}
                            renderItem={renderTransport}
                            numColumns={getAllTransports().length}
                        />
                    <Button text={<FontAwesome5 name={"info-circle"} size={16}/>} status="info" style={styles.button} onPress={() => { setInstructionModalVisible(true) }} />
                </SectionContent>
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

const getIntitialRegion = (origin, destination) => {
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
    },
    instructions: {
        flex: 1, 
        justifyContent: 'left', 
        alignItems: 'left',
        marginLeft: 20,
        marginTop: 55
    }
})

export default SavedTripInfo;
