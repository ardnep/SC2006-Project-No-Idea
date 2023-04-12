import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { SectionList, StyleSheet, Modal, View, Pressable, TouchableOpacity } from 'react-native';
import { Button, Layout, Section, SectionContent, TopNav, Text, TextInput, useTheme } from 'react-native-rapi-ui';
import { getExecutedTripsSortedByDate } from '../controllers/HistoryController';
import { getSavedTripByID } from '../controllers/SavedTripsController';
import { themeColor } from "react-native-rapi-ui";
import moment from 'moment-timezone';
import { editExecutedTripPrice } from "../controllers/SavedTripsController";
import styles from '../styles/main';

/** Displays TripHistory screen */
export default function ({ navigation }) {
    const { isDarkmode } = useTheme();
    let executedTrips = getExecutedTripsSortedByDate();
    const [price, setPrice] = useState(null);
    const [groupedTrips, setGroupedTrips] = useState(groupExecutedTripsByDate(executedTrips));
    const [popupState, setPopupState] = useState({selectedTrip: null, visible: false});
    const handlePriceChange = (value) => {
        setPrice(Number(value));
    };
    const handleSubmit = () => {
        editExecutedTripPrice(popupState.selectedTrip, price);
        updateGroupedTrips();
        setPopupState({selectedTrip: popupState.selectedTrip, visible: false});
    };

    function updateGroupedTrips() {
        executedTrips = [...getExecutedTripsSortedByDate()];
        setGroupedTrips(groupExecutedTripsByDate(executedTrips));
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <Text fontWeight='bold' style={styles.sectionHeader}> {section.title}</Text>
        );
    };

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

    const renderTrip = ({ item }) => {
        const timestamp = item.timeStamp.seconds;
        const startTime = getTime(timestamp);
        const endTime = getTime(timestamp + item.duration * 60);
        const trip = getSavedTripByID(item.tripID);
        return (
            <TouchableComponent onLongPress={() => {
                setPopupState({selectedTrip:item,visible:true});
            }}
            onPress={() => { navigation.navigate("ExecutedTripInfo", { item, trip, updateGroupedTrips }) }} style={styles.itemContainer}>
                <Section style={styles.section}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleContainerMiddleContent}>
                            <Text fontWeight='bold'>{trip.name}</Text>
                            
                        </View>
                        
                    </View>
                    <Text style={{ textAlign:'center' }}>{trip.srcName} to {trip.destName}</Text>
                    <SectionContent>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{getDisplayPrice(item)} | {startTime} - {endTime} | {item.distance.toFixed(1)}km by {item.modeOfTransport}</Text>
                            {/* <Text>{startTime} - {endTime}</Text>
                            <Text>{item.distance.toFixed(1)}km by {item.modeOfTransport}</Text> */}
                        </View>
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
                middleContent="Trip History"
            />
            <SectionList
                sections={groupedTrips}
                renderItem={renderTrip}
                renderSectionHeader={renderSectionHeader}
                style={{marginTop:5}}
            />
            <View style={stylus.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={popupState.visible}
>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)'}}>
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
                            value={price}
                            onChangeText={handlePriceChange}
                            keyboardType="numeric"
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                        />
                        <SectionContent style={{
        flexDirection: 'row',
        justifyContent: 'center'
    }}>
                        <Button text={<FontAwesome5 name={"pen"} size={16}/>}onPress={handleSubmit} style={stylus.button} />
                        <Button text={<FontAwesome name={"close"} size={16}/>} onPress={() => setPopupState({selectedTrip: popupState.selectedTrip, visible: false})} style={stylus.button} />
                        </SectionContent>
                    </Section>
                    </View>
                </Modal>
            </View>
        </Layout>
    );
}

const stylus = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0
      },
      button: {
        marginHorizontal: 4
    }
});

function groupExecutedTripsByDate(executedTrips) {
    const groupedTrips = executedTrips.reduce((result, item) => {
        const date = getDate(item.timeStamp.seconds);
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(item);
        return result;
    }, {});
    const sections = Object.keys(groupedTrips).map((date) => ({
        title: date,
        data: groupedTrips[date],
    }));
    return sections;
}

export function getCorrectPrice(execTripObj){
    console.log(execTripObj);
    if(execTripObj.tripPrice.userInputPrice && execTripObj.tripPrice.userInputPrice != -1){
        return execTripObj.tripPrice.userInputPrice;  
    }
    return execTripObj.tripPrice.estimatedPrice;
}

export function getDisplayPrice(execTripObj){
    let priceToShow = getCorrectPrice(execTripObj);
    if(priceToShow == -1){
        return "N/A";
    }
    return "$" +  priceToShow.toFixed(2);
}

export function getDate(timestamp) {
    return moment.unix(timestamp).tz("Asia/Singapore").format("DD/MM/YYYY");
}

export function getTime(timestamp) {
    return moment.unix(timestamp).tz("Asia/Singapore").format("hh:mm");
}
