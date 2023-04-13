import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTrip from "../views/AddTrip";

const AddTripStack = createNativeStackNavigator();

/**
 * Creates a navigation stack for the Add Trip feature.
 */
const AddTripNavigator = () => {
    return (
        <AddTripStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <AddTripStack.Screen name="AddTrip" component={AddTrip} />
        </AddTripStack.Navigator>
    )
};

export default AddTripNavigator;