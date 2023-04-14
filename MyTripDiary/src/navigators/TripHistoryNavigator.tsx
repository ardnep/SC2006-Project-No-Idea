import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripHistory from "../views/trip-history/TripHistory";
import ExecutedTripInfo from "../views/trip-history/ExecutedTripInfo";

const TripHistoryStack = createNativeStackNavigator();

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