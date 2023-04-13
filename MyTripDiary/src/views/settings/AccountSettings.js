import React from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { TopNav, Layout, Text, TextInput, Button, Section, SectionContent } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-rapi-ui';
import { getUserDisplayName, getUserEmail, getUserPhoneNumber, updateUserDisplayName, updateUserEmail } from '../../controllers/FirebaseController';

export default function AccountSettings({ route, navigation }) {
    const { isDarkmode } = useTheme();

    const { updateDisplayName } = route.params;

    const [editDisplayName, setEditDisplayName] = React.useState(false);
    const [editEmail, setEditEmail] = React.useState(false);

    const [email, setEmail] = React.useState(getUserEmail());
    const [displayName, setDisplayName] = React.useState(getUserDisplayName());
    const [phoneNumber, setPhoneNumber] = React.useState(getUserPhoneNumber());

    const confirmDisplayNameChange = () => {
        updateUserDisplayName(displayName);
        updateDisplayName();
        setEditDisplayName(false);
    }

    const confirmEmailChange = () => {
        updateUserEmail(email);
        setEditEmail(false);
    }

    return (
        <Layout>
            <Modal visible={editDisplayName}>
                <Section style={styles.editDisplayNameContainer}>
                    <Text style={styles.text}>Enter New Display Name:</Text>
                    <TextInput
                        value={displayName}
                        onChangeText={(val) => { setDisplayName(val) }}
                        keyboardType="numeric"
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                    />
                    <SectionContent style={styles.buttonSection}>
                        <Button text="Confirm" onPress={confirmDisplayNameChange} style={styles.button} />
                        <Button text="Cancel" onPress={() => setEditDisplayName(false)} style={styles.button} />
                    </SectionContent>
                </Section>
            </Modal>
            <Modal visible={editEmail}>
                <Section style={styles.editDisplayNameContainer}>
                    <Text style={styles.text}>Enter New Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(val) => { setEmail(val) }}
                        keyboardType="email"
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
                    />
                    <SectionContent style={styles.buttonSection}>
                        <Button text="Confirm" onPress={confirmEmailChange} style={styles.button} />
                        <Button text="Cancel" onPress={() => setEditEmail(false)} style={styles.button} />
                    </SectionContent>
                </Section>
            </Modal>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20} />}
                leftAction={navigation.goBack}
                middleContent="Account"
            />
            <TouchableOpacity onPress={() => { setEditDisplayName(true); }}>
                <Text style={styles.optionText}>Change Display Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setEditEmail(true); }}>
                <Text style={styles.optionText}>Change Email</Text>
            </TouchableOpacity>
        </Layout>
    );
}

const styles = StyleSheet.create({
    optionText: {
        padding: 10,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'light'
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        marginHorizontal: 4
    },
    editDisplayNameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 10
    }
});
