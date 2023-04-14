import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analytics from "../views/analytics/Analytics";

const AddTripStack = createNativeStackNavigator();

/**
 * Creates a navigation stack for the Add Trip feature.
 */
const AnalyticsNavigator = () => {
    return (
        <AddTripStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <AddTripStack.Screen name="Analytics" component={Analytics} />
        </AddTripStack.Navigator>
    )
};

export default AnalyticsNavigator;