import React from 'react';
import { View } from 'react-native';
import { Button, Layout, Text } from 'react-native-rapi-ui';
import { starTrips } from '../helpers/TripStarrer';

export default function ({ navigation }) {
    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text>This is the Analytics tab</Text>
                <Button text='Test Button'></Button>
            </View>
        </Layout>
    );
} 
