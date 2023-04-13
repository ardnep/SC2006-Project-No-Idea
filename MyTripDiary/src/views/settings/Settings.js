import React from 'react';

import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { firebaseAuth, getUserDisplayName, userSignOut } from '../../controllers/FirebaseController';
import { Layout, TopNav, Avatar, Text } from 'react-native-rapi-ui';

import { useTheme } from 'react-native-rapi-ui';

/**
 * Displays the Settings app onto the screen 
 */
export default function Settings({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  const [displayName, setDisplayName] = React.useState(getUserDisplayName());

  const updateDisplayName = () => {
    setDisplayName(getUserDisplayName());
  }

  return (
    <Layout>
      <TopNav
        middleContent="Settings"

      />
      <Image
        style={styles.icon}
        source={require('../../../assets/profile-user.png')} />
      <View style={{ height: "10%", justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.text}>{displayName || 'N/A'}</Text>
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate("AccountSettings", { updateDisplayName }) }}>
        <Text style={styles.optionText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { setTheme(isDarkmode ? "light" : "dark") }}>
        <Text style={styles.optionText}>{isDarkmode ? "Switch to Light Mode" : "Switch to Dark Mode"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { userSignOut() }}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.ver}>Ver 1.0</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginTop: 30,
    width: 150,
    height: 150,
  },
  optionText: {
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'light'
  },
  ver: {
    marginTop: 50,
    textAlign: 'center',
  }
});

