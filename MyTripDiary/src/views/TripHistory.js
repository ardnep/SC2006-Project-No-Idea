import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {   TouchableHighlight, SectionList, StyleSheet, StatusBar, View, FlatList } from 'react-native';
import { Layout, Text, TopNav, useTheme } from 'react-native-rapi-ui';
import { getExecutedTripsGroupedByDate } from '../controllers/HistoryController';

/** Displays TripHistory screen */
export default function ({ navigation }) {
    const { isDarkmode } = useTheme();
    const [executedTrips, setExecutedTrips] = useState(getExecutedTripsGroupedByDate());
    console.log(getExecutedTripsGroupedByDate());
    const renderExecutedTrip = ({ item }) => {
        const trip = item;
        return (
            <Pressable onPress={() => { navigation.navigate("SavedTripInfo", { trip, updateSavedTrips }) }}>
                <Section style={styles.section}>
                    <Text>{trip.name}</Text>
                    <SectionContent>
                        <Text>{trip.srcName} to {trip.destName}</Text>
                    </SectionContent>
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
		</Layout>
	);
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
    sectionHeader: {
        paddingLeft: 16,
        fontSize: 20,
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        backgroundColor: '#00fb9a',
        padding: 16,  
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemContainer: {
        flex: 1,
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