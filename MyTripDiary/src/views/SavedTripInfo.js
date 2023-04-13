import { Ionicons } from "@expo/vector-icons";
import { Alert, Modal, StyleSheet, ScrollView, View, FlatList, useWindowDimensions, SafeAreaView } from "react-native";
import { Button, Layout, Section, SectionContent, Text, TextInput, TopNav, themeColor, useTheme } from "react-native-rapi-ui";
import { deleteSavedTrip, renameSavedTrip } from "../controllers/SavedTripsController";
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import darkMapStyle from '../styles/darkMap.json'
import { Fragment, useState } from "react";
import { RenderHTML } from 'react-native-render-html';
import { FontAwesome5 } from "@expo/vector-icons";
import { getAllTransports, getDefaultTransport } from "../controllers/RouteManager";
import { duration } from "moment";
import { executeTrip } from "../controllers/TripExecutor";

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
    const { width } = useWindowDimensions();
    const [inst, setInst] = useState("");
    const [name, setName] = useState(trip.name);
    const [gmap, setGmap] = useState({});
    const [markers, setMarkers] = useState([]);
    const [executionInfo, setExecutionInfo] = useState([]);
    const [transport, setTransportType] = useState(getDefaultTransport());
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [instructionModalVisible, setInstructionModalVisible] = useState(false);
    const origin = { latitude: trip.srcLat, longitude: trip.srcLong };
    const destination = { latitude: trip.destLat, longitude: trip.destLong };
    const instructionTextColor = isDarkmode ? "#FFFFFF" : "#000000";
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
            <Button text={<FontAwesome5 name={newTransport.displayIcon} size={16} />} status="primary" style={styles.button} onPress={() => {
                if (transport.type == newTransport.type) {
                    newTransport.getPrice(gmap).then(executionPrice => {
                        setExecutionInfo([gmap.duration, gmap.distance, executionPrice]);
                    });
                }
                setTransportType(newTransport);
            }} />
        )
    }
    const renderInstruction = ({ item }) => {
        let textMap = []
        console.info(item)
        item.split('</b>').forEach(line => {
            let parts = line.split('<b>');
            if (parts[0].includes('</div>')) {
                let partText = parts[0].split('">')[1].replace("</div>", "");
                if (!parts[0].includes('(')) {
                    partText = " (" + partText + ")";
                }
                textMap.push({ "text": partText, "bold": false, "italics": false })
            } else {
                textMap.push({ "text": parts[0], "bold": false, "italics": false });
            }
            if (parts.length > 1 && parts[1] !== '') {
                textMap.push({ "text": parts[1], "bold": true, "italics": false });
            }
        });
        return (
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {
                    textMap.map((part, index) => {
                        return (
                            <Text style={{ marginVertical: 10, color: instructionTextColor, fontStyle: part.italics ? 'italic' : 'normal' }} fontWeight={part.bold ? "bold" : "normal"} key={index}>{part.text}</Text>
                        );
                    })
                }
            </View>
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
                    <Section style={styles.editTripNameContainer}>
                        <Text style={styles.text}>Enter new name:</Text>
                        <TextInput
                            value={name}
                            onChangeText={handleNameChange}
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                        />
                        <SectionContent style={styles.buttonSection}>
                            <Button text="Confirm" onPress={handleSubmit} style={styles.button} />
                            <Button text="Cancel" onPress={() => setEditModalVisible(false)} style={styles.button} />
                        </SectionContent>
                    </Section>
                </Modal>
                <Modal visible={instructionModalVisible} animationType="slide">
                    <Section style={styles.editTripNameContainer}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={{ flex: 1, height: '70%', width: '92%' }}>
                                <FlatList
                                    data={inst}
                                    renderItem={renderInstruction}
                                    numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <SectionContent style={styles.buttonSection}>
                                <Button text="Close" onPress={() => setInstructionModalVisible(false)} style={styles.button} />
                            </SectionContent>
                        </SafeAreaView>
                    </Section>
                </Modal>
                <SectionContent>
                    <View>
                        <Text>From: {trip.srcName}</Text>
                        <Text>To: {trip.destName}</Text>
                    </View>
                    {executionInfo.length > 0 ? <View>

                        <Text>{Math.round(executionInfo[0])}mins ({executionInfo[1].toFixed(2)}km)</Text>
                        <Text>{executionInfo[2] == 0 ? "Free" : (executionInfo[2] == -1 ? "Unable to Estimate" : `S$${executionInfo[2]}`)}</Text>
                    </View> : null}
                </SectionContent>
                <MapView
                    initialRegion={getIntitialRegion(origin, destination)}
                    style={{ height: '50%' }}
                    customMapStyle={isDarkmode ? darkMapStyle : []}
                    userInterfaceStyle={isDarkmode ? 'dark' : 'light'}
                >
                    <Marker coordinate={origin} pinColor={themeColor.primary} description={transport.type === "TRANSIT" ? inst[0] : null} title={transport.type === "TRANSIT" ? "Step 1" : null} />
                    <Marker coordinate={destination} />
                    {
                        markers.map((item, index) => {
                            console.log(index);
                            return (
                                <Marker coordinate={{ latitude: item.lat, longitude: item.lng }} pinColor={themeColor.warning500} description={inst[index + 1]} title={`Step ${index + 2}`} key={index} />
                            );
                        })
                    }
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        mode={transport.type}
                        apikey={process.env.MAPS_API_KEY}
                        strokeWidth={5}
                        resetOnChange={true}
                        strokeColor={"#6495ED"}
                        onReady={result => {
                            transport.getPrice(result).then(executionPrice => {
                                setExecutionInfo([result.duration, result.distance, executionPrice]);
                            });
                            let instructions = []
                            result.legs[0].steps.forEach(x => x.html_instructions.replace(/<wbr\/>/g, '').split('<br>').forEach(x => { if (x !== '') { instructions.push(x) } }));
                            let routeSteps = result.legs[0].steps;
                            let markerCoords = []
                            for (var i = 1; i < routeSteps.length; i++) {
                                if ((routeSteps[i].travel_mode != routeSteps[i - 1].travel_mode) || routeSteps[i].travel_mode == "TRANSIT") {
                                    markerCoords.push(routeSteps[i].start_location);
                                }
                            }
                            setMarkers(markerCoords);
                            setInst(instructions);
                            setGmap(result);
                        }}
                    />
                </MapView>
                {/* <SectionContent style={styles.buttonSection}>
                    <Button text="Delete" status="danger" style={styles.button} onPress={() => { confirmDelete(trip, navigation, updateSavedTrips) }} />
                    <Button text="Edit" status="primary" style={styles.button} onPress={() => { setEditModalVisible(true) }} />
                    <Button text="Start" status="primary" style={styles.button} onPress={() => { executeTrip(trip, new Date(), transport.name, executionInfo[2], executionInfo[0], executionInfo[1]) }} />
                </SectionContent> */}
                <SectionContent style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    {/* <Button text={<FontAwesome5 name={"car"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("DRIVING") }} />
                    <Button text={<FontAwesome5 name={"taxi"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("DRIVING") }} />
                    <Button text={<FontAwesome5 name={"bus-alt"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("TRANSIT") }} />
                    <Button text={<FontAwesome5 name={"bicycle"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("BICYCLING") }} />
                    <Button text={<FontAwesome5 name={"walking"} size={16}/>} status="primary" style={styles.button} onPress={() => { changeTransport("WALKING") }} /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button text={<FontAwesome5 name={"play"} size={16} />} status="success" style={styles.button} onPress={() => {
                            executeTrip(trip, new Date(), transport.name, executionInfo[2], executionInfo[0], executionInfo[1]);
                            Alert.alert(
                                `Executed Successfully`,
                                `${trip.name} has been executed!`
                            );
                        }} />
                        <Button text={<FontAwesome5 name={"info-circle"} size={16} />} status="info" style={styles.button} onPress={() => { setInstructionModalVisible(true) }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <FlatList
                            data={getAllTransports()}
                            renderItem={renderTransport}
                            numColumns={getAllTransports().length}
                        />
                    </View>
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
        latitudeDelta: deltaLat * 1.2, longitudeDelta: deltaLng * 1.2,
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
    textContainer: {
        flexWrap: "wrap"
    },
    instructionsContainer: {
        flex: 1,
        justifyContent: 'left',
        alignItems: 'left',
        marginLeft: 20,
        marginTop: 55
    }
})

export default SavedTripInfo;
