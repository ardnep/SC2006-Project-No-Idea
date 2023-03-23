import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, TextInput, Text } from 'react-native-rapi-ui';
import { Ionicons, Entypo } from '@expo/vector-icons'; 

/** Defines styles used in the screen. */
const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingTop: 16,
        flex: 1,
    },
    textStyle: {
        fontSize: 16,
    },
    textInputStyle: {
        // This doesn't work. cant change the textinput styling for some reason
        size: 30,
        height: 100,
    },
    checkmarkStyle: {
        flexDirection: 'row',
        alignContent: 'center', 
        paddingRight: 16,
    },
});

/** Displays EditPrice screen. */
export default function ({ navigation, route }) {
    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Edit price: (Should show 10.00 for all trips for now. Value won't be able to be updated yet.)</Text>
                <TextInput keyboardType='numeric' style={styles.textInputStyle}>{route.params.priceKey.toFixed(2)}</TextInput>
                <View style={styles.checkmarkStyle}>
                    <Entypo onPress={() => navigation.goBack()} name="cross" size={40} color="black" />
                    <Ionicons onPress={() => 
                        // Save value of edited price to firebase

                        // Navigate back
                        navigation.goBack()} 
                        name="checkmark" size={40} color="black" /> 
                </View>
                

            </View>        
        </Layout>
    );
}