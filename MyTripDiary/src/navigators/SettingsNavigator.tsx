import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../views/settings/Settings";
import AccountSettings from "../views/settings/AccountSettings";

const SettingsStack = createNativeStackNavigator();

/**
 * Creates a navigation stack for the Add Trip feature.
 */
const SettingsNavigator = () => {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <SettingsStack.Screen name="Settings" component={Settings} />
            <SettingsStack.Screen name="AccountSettings" component={AccountSettings} />
        </SettingsStack.Navigator>
    )
};

export default SettingsNavigator;