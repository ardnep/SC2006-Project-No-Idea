import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import personalisation from './personalisation';

/**
 * Displays the Settings app onto the screen 
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Image
        style={styles.icon}
        source={require('./assets/profile-user.png')} />
      <TouchableOpacity>
        <Text style={styles.optiontextf}>General</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.optiontext}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.optiontext}>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.optiontext}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.optiontext}>Personalisation</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.optiontext}>Help</Text>
      </TouchableOpacity>
      <Text style={styles.ver}>Ver 1.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    marginTop: 0,
    marginLeft: 0,
    paddingVertical: 0,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 30,
    width: 150,
    height: 150,
  },
  optiontextf: {
    marginTop: 30,
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'light',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optiontext: {
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'light',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ver: {
    marginTop: 50,
    textAlign: 'center',
  }
});

