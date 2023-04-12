import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SectionList, StyleSheet, StatusBar, View, Pressable, TouchableOpacity } from 'react-native';
import { Layout, Section, SectionContent, TopNav, Text, useTheme } from 'react-native-rapi-ui';
import { getExecutedTripsSortedByDate } from '../controllers/HistoryController';
import { getSavedTripByID } from '../controllers/SavedTripsController';
import moment from 'moment-timezone';

import styles from '../styles/main';

/** Displays TripHistory screen */
export default function ({ navigation }) {
    const { isDarkmode } = useTheme();
    let executedTrips = getExecutedTripsSortedByDate();
    const [groupedTrips, setGroupedTrips] = useState(groupExecutedTripsByDate(executedTrips));

    function updateGroupedTrips() {
        executedTrips = [...getExecutedTripsSortedByDate()];
        setGroupedTrips(groupExecutedTripsByDate(executedTrips));
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <Section style={styles.sectionHeaderContainer}>
                <Text fontWeight='bold' style={styles.sectionHeader}>{section.title}</Text>
            </Section>
        );
    };

    const renderTrip = ({ item }) => {
        const timestamp = item.timeStamp.seconds;
        const startTime = getTime(timestamp);
        const endTime = getTime(timestamp + item.duration * 60);
        const trip = getSavedTripByID(item.tripID);
        return (
            <TouchableOpacity onPress={() => { navigation.navigate("ExecutedTripInfo", { item, trip, updateGroupedTrips }) }} style={styles.itemContainer}>
                <Section style={styles.section}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleContainerMiddleContent}>
                            <Text fontWeight='bold'>{trip.name}</Text>
                        </View>
                    </View>
                    <SectionContent>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{trip.srcName} to {trip.destName}</Text>
                            <Text>{startTime} - {endTime}</Text>
                            <Text>${item.tripPrice.toFixed(2)}</Text>
                        </View>
                    </SectionContent>
                </Section>
            </TouchableOpacity>
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
            />
        </Layout>
    );
}

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

function getDate(timestamp) {
    return moment.unix(timestamp).tz("Asia/Singapore").format("DD/MM/YYYY");
}

export function getTime(timestamp) {
    return moment.unix(timestamp).tz("Asia/Singapore").format("hh:mm");
}
