import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { TopNav } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-rapi-ui';

export default function AccountSettings({ route, navigation }) {
    const { currentUser } = route.params;
    const { isDarkmode, setTheme } = useTheme();

    return (
        <SafeAreaView style={styles.container}>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent="Account"
            />
            <TouchableOpacity style={styles.option} onPress={() => { setTheme(isDarkmode ? "light" : "dark") }}>
                <Text style={styles.optionText}>{isDarkmode ? "Switch to Light Mode" : "Switch to Dark Mode"}</Text>
            </TouchableOpacity>
            <Text style={styles.version}>Version 1.0</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    icon: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 30,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    option: {
        alignSelf: 'stretch',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'gray',
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 10,
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    version: {
        position: 'absolute',
        bottom: 20,
        fontSize: 12,
    },
});
