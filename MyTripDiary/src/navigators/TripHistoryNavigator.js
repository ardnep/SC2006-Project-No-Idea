import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripHistory from "../views/TripHistory";
import EditPrice from "../views/EditPrice";
import ExecutedTripInfo from "../views/ExecutedTripInfo";

const TripHistoryStack = createNativeStackNavigator();

const TripHistoryNavigator = () => {
    return (
        <TripHistoryStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <TripHistoryStack.Screen name="TripHistory" component={TripHistory} />
            <TripHistoryStack.Screen name="ExecutedTripInfo" component={ExecutedTripInfo} />
            <TripHistoryStack.Screen name="EditPrice" component={EditPrice} />
        </TripHistoryStack.Navigator>
    )
};

export default TripHistoryNavigator;