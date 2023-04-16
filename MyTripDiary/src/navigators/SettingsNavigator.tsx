/**
 * @fileoverview A Navigator component for navigating to settings-related views, including Settings and AccountSettings.
 * @module navigators/SettingsNavigator
 * @returns {JSX.Element} The rendered SettingsNavigator component.
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../views/settings/Settings";
import AccountSettings from "../views/settings/AccountSettings";

/**
 * The stack navigator for the settings-related views.
 * @type {Object}
 */
const SettingsStack = createNativeStackNavigator();

/**
 * The SettingsNavigator component.
 * @function
 * @returns {JSX.Element} The rendered SettingsNavigator component.
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
