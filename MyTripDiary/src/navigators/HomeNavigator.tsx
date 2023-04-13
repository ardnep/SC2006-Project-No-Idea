import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedTripInfo from "../views/saved-trips/SavedTripInfo";
import SavedTrips from "../views/saved-trips/SavedTrips";
import AddSavedTrip from "../views/saved-trips/AddSavedTrip";
import TripHistory from "../views/trip-history/TripHistory";
import ExecutedTripInfo from "../views/trip-history/ExecutedTripInfo";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <HomeStack.Screen name="SavedTrips" component={SavedTrips} />
            <HomeStack.Screen name="AddSavedTrip" component={AddSavedTrip} />
            <HomeStack.Screen name="SavedTripInfo" component={SavedTripInfo} />
            <HomeStack.Screen name="TripHistory" component={TripHistory} />
            <HomeStack.Screen name="ExecutedTripInfo" component={ExecutedTripInfo} />
        </HomeStack.Navigator>
    )
};

export default HomeNavigator;