import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SectionList, StyleSheet, StatusBar, View, Pressable } from 'react-native';
import { Layout, Section, SectionContent, Text, TopNav, useTheme } from 'react-native-rapi-ui';
import { getExecutedTripsSortedByDate } from '../controllers/HistoryController';

/** Displays TripHistory screen */
export default function ({ navigation }) {
    const { isDarkmode } = useTheme();
    const [executedTrips, setExecutedTrips] = useState(getExecutedTripsSortedByDate());
    let groupedTrips = groupExecutedTripsByDate(executedTrips);

    const renderSectionHeader = ({ section }) => {
        return (
            <Section style={styles.sectionHeaderContainer}>
                <Text size='xl' fontWeight="medium">{section.title}</Text>
            </Section>
        );
    };

    const renderTrip = ({ item }) => {
        const timestamp = item.timeStamp.seconds;
        const startTime = getTime(timestamp);
        const endTime = getTime(timestamp + item.duration*60)
        return (
            <Pressable onPress={() => { navigation.navigate() }}>
                <Section style={styles.itemContainer}>
                    <SectionContent style={styles.timeAndPriceContainer}>
                        <Text>{startTime} - {endTime}</Text>
                        <Text>${item.tripPrice.toFixed(2)}</Text>
                    </SectionContent>
                    <Text>Mode of transport: {item.modeOfTransport}</Text>
                </Section>
            </Pressable>
        )
    }

    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
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

function getDateObject(timestamp) {
    let date = new Date(1970, 0, 1);
    date.setSeconds(timestamp);
    return date;
}

function getDate(timestamp) {
    const date = getDateObject(timestamp);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function getTime(timestamp) {
    const date = getDateObject(timestamp);
    let minutes = date.getMinutes();
    if (minutes < 10)
        minutes = "0" + minutes;
    return date.getHours() + ":" + minutes;
}

/** 
 * OneTrip component. Displays information for each executed trip, and contains
 * start time, end time, start point, end point, and price. 
 */
// sections={[
//     {title: '28 Feb 2023', data:["Home to The Hive", "The Hive to Home"]},
//     {title: '27 Feb 2023', data:["Home to NTU Carpark F", "NTU Carpark F to Home"]},
// ]}
const OneTrip = props => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.timeAndPriceContainer}>
                <Text>{props.startTime} - {props.endTime}</Text>
                <Text>${props.price}</Text>
            </View>
            <View style={styles.startAndEndPointContainer}>
                <Text>{props.startPoint} to {props.endPoint}</Text>
            </View>
        </View>
    );
};

/** Defines styles used in the screen. */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    sectionHeaderContainer: {
        paddingLeft: 16,
        paddingVertical: 4,
    },
    item: {
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemContainer: {
        elevation: 16,
        margin: 8  
    },
    timeAndPriceContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    startAndEndPointContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});