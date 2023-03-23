import React from 'react';
import {   TouchableHighlight, SectionList, StyleSheet, StatusBar, View } from 'react-native';
import { Layout, Text } from 'react-native-rapi-ui';

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

/** 
 * OneTrip component. Displays information for each executed trip, and contains
 * start time, end time, start point, end point, and price. 
 */
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
// sections={[
//     {title: '28 Feb 2023', data:["Home to The Hive", "The Hive to Home"]},
//     {title: '27 Feb 2023', data:["Home to NTU Carpark F", "NTU Carpark F to Home"]},
// ]}

/** Displays TripHistory screen */
export default function ({ navigation }) {
    // Get trip history data from firebase
    // Dummy data for now
    let sectionsArray = [];
    let dataArray = [
        <OneTrip startTime="4.20pm" endTime="5.20pm" startPoint="Home" endPoint="NTU Carpark F" price="18.80"></OneTrip>, 
        <OneTrip startTime="8.00pm" endTime="9.02pm" startPoint="NTU Carpark F" endPoint="Home" price="2.40"></OneTrip>
    ].reverse();
    let titleDate = "28 Feb 2023";
    sectionsArray.push({title: titleDate, data: dataArray});
    
    dataArray = [
        <OneTrip startTime="12.20pm" endTime="1.27pm" startPoint="Home" endPoint="The Hive" price="33.00"></OneTrip>, 
        <OneTrip startTime="9.32pm" endTime="10.24pm" startPoint="The Hive" endPoint="Home" price="1.60"></OneTrip>
    ].reverse();
    titleDate = "27 Feb 2023";
    sectionsArray.push({title: titleDate, data: dataArray});

    dataArray = [
        <OneTrip startTime="11.25am" endTime="12.27pm" startPoint="Home" endPoint="The Arc" price="2.30"></OneTrip>, 
        <OneTrip startTime="10.30pm" endTime="11.24pm" startPoint="The Arc" endPoint="Home" price="1.80"></OneTrip>
    ].reverse();
    titleDate = "26 Feb 2023";
    sectionsArray.push({title: titleDate, data: dataArray});

    dataArray = [
        <OneTrip startTime="12.20pm" endTime="1.27pm" startPoint="Home" endPoint="The Hive" price="1.80"></OneTrip>, 
        <OneTrip startTime="9.32pm" endTime="10.24pm" startPoint="The Hive" endPoint="Home" price="2.40"></OneTrip>
    ].reverse();
    titleDate = "25 Feb 2023";
    sectionsArray.push({title: titleDate, data: dataArray});
	
    let price = 10; 
    return (
		<Layout>
            <SectionList
                sections={sectionsArray}
                // TODO Edit below line "{priceKey: price}" section to pass the OneTrip price prop instead of current hardcoded price of $10
                renderItem={({item}) => <TouchableHighlight onPress={() => navigation.navigate("EditPrice", {priceKey: price})} underlayColor="#baffde" style={styles.item}>{item}</TouchableHighlight>} 
                renderSectionHeader={({section}) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={item => `basicListEntry-${item}`}
            />
		</Layout>
	);
}