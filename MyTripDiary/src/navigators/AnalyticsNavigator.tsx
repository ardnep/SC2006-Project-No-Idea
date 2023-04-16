/**
 * @fileoverview A Navigator component for navigating to the Analytics view.
 * @module navigators/AnalyticsNavigator
 * @returns {JSX.Element} The rendered AnalyticsNavigator component.
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analytics from "../views/analytics/Analytics";

/**
 * The stack navigator for the Analytics view.
 * @type {Object}
 */
const AnalyticsStack = createNativeStackNavigator();

/**
 * The AnalyticsNavigator component.
 * @function
 * @returns {JSX.Element} The rendered AnalyticsNavigator component.
 */
const AnalyticsNavigator = () => {
    return (
        <AnalyticsStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <AnalyticsStack.Screen name="Analytics" component={Analytics} />
        </AnalyticsStack.Navigator>
    )
};

export default AnalyticsNavigator;
