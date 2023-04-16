/**
 * @fileoverview A Navigator component for navigating to trip history-related views, including TripHistory and ExecutedTripInfo.
 * @module navigators/TripHistoryNavigator
 * @returns {JSX.Element} The rendered TripHistoryNavigator component.
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripHistory from "../views/trip-history/TripHistory";
import ExecutedTripInfo from "../views/trip-history/ExecutedTripInfo";

/**
 * The stack navigator for the trip history-related views.
 * @type {Object}
 */
const TripHistoryStack = createNativeStackNavigator();

/**
 * The TripHistoryNavigator component.
 * @function
 * @returns {JSX.Element} The rendered TripHistoryNavigator component.
 */
const TripHistoryNavigator = () => {
    return (
        <TripHistoryStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <TripHistoryStack.Screen name="TripHistory" component={TripHistory} />
            <TripHistoryStack.Screen name="ExecutedTripInfo" component={ExecutedTripInfo} />
        </TripHistoryStack.Navigator>
    )
};

export default TripHistoryNavigator;
