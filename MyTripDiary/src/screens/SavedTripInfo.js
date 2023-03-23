import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Button, Layout, Section, SectionContent, SectionImage, Text, TopNav, useTheme } from "react-native-rapi-ui";

/**
 * Displays information about a saved trip and allows the user to interact with it.
 * @param {object} props
 * @param {object} props.route - The route object containing information about the current route.
 * @param {object} props.navigation - The navigation object
 * @returns {JSX.Element} - Screen
 */

function SavedTripInfo({ route, navigation }) {
    const { isDarkmode } = useTheme();
    const { trip } = route.params;
    return (
        <Layout>
            <TopNav
                leftContent={<Ionicons name="chevron-back" color={isDarkmode ? 'white' : 'black'} size={20}/>}
                leftAction={navigation.goBack}
                middleContent="Trip Info"
            />
            <Section>
                <SectionContent>
                    <Text>From: {trip.originName}</Text>
                    <Text>To: {trip.destName}</Text>
                </SectionContent>
                <SectionImage 
                    source={{uri: 'https://assets.entrepreneur.com/content/3x2/2000/20190124141200-map1.jpeg'}}
                    height={200}
                />
                <SectionContent style={styles.buttonSection}>
                    <Button text = "Delete" status="danger" style={styles.button}/>
                    <Button text = "Edit" status="primary" style={styles.button}/>
                    <Button text = "Start" status="primary" style={styles.button}/>
                </SectionContent>
            </Section>

        </Layout>
    )
}

/**
 * The styles for the `SavedTripInfo` component.
 */

const styles = StyleSheet.create({
    buttonSection: {
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    button: {
        marginHorizontal: 4
    }
})

export default SavedTripInfo;
