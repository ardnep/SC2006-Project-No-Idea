import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedTripInfo from "../views/SavedTripInfo";
import SavedTrips from "../views/SavedTrips";
import TripInfo from "../views/TripInfo";
import TripHistory from "../views/TripHistory";
import EditPrice from "../views/EditPrice";
import Home from "../views/Home";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="SavedTrips" component={SavedTrips} />
            <HomeStack.Screen name="SavedTripInfo" component={SavedTripInfo} />
            <HomeStack.Screen name="TripInfo" component={TripInfo} />
            <HomeStack.Screen name="TripHistory" component={TripHistory} />
            <HomeStack.Screen name="EditPrice" component={EditPrice} />
        </HomeStack.Navigator>
    )
};

export default HomeNavigator;