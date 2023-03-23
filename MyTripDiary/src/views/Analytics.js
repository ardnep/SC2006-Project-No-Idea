/**
This is the Analytics tab screen component.
It displays all the analytics contents on the Analytics tab screen.
@param {object} navigation - The navigation object provided by React Navigation.
@returns {JSX.Element} - The JSX element that represents the Analytics tab screen.
*/
import React from 'react';
import { View } from 'react-native';
import { Layout, Text } from 'react-native-rapi-ui';

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
			</View>
		</Layout>
	);
}
