/**
 * @fileoverview A Navigator component for navigating to home-related views, including SavedTrips, AddSavedTrip, and SavedTripInfo.
 * @module navigators/HomeNavigator
 * @returns {JSX.Element} The rendered HomeNavigator component.
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedTripInfo from "../views/saved-trips/SavedTripInfo";
import SavedTrips from "../views/saved-trips/SavedTrips";
import AddSavedTrip from "../views/saved-trips/AddSavedTrip";

/**
 * The stack navigator for the home-related views.
 * @type {Object}
 */
const HomeStack = createNativeStackNavigator();

/**
 * The HomeNavigator component.
 * @function
 * @returns {JSX.Element} The rendered HomeNavigator component.
 */
const HomeNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <HomeStack.Screen name="SavedTrips" component={SavedTrips} />
            <HomeStack.Screen name="AddSavedTrip" component={AddSavedTrip} />
            <HomeStack.Screen name="SavedTripInfo" component={SavedTripInfo} />
        </HomeStack.Navigator>
    )
};

export default HomeNavigator;
