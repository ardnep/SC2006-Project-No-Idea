import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../views/Settings";

const AddTripStack = createNativeStackNavigator();

/**
 * Creates a navigation stack for the Add Trip feature.
 */
const SettingsNavigator = () => {
    return (
        <AddTripStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <AddTripStack.Screen name="Settings" component={Settings} />
        </AddTripStack.Navigator>
    )
};

export default SettingsNavigator;