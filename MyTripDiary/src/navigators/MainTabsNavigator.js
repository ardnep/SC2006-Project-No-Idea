import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import { useTheme, themeColor } from "react-native-rapi-ui";

import AddTripNavigator from "./AddTripNavigator";
import SettingsNavigator from "./SettingsNavigator";
import AnalyticsNavigator from "./AnalyticsNavigator";
import HomeNavigator from "./HomeNavigator";

/**
 * Creates a navigation stack for the main app.
 * @return {JSX.Element} The main app navigation stack.
 */
const MainStack = createNativeStackNavigator();

/**
 * Renders the main app navigation stack with views for the main tabs, 
 * trip info, trip history, and edit price.
 */
const Main = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="MainTabs" component={MainTabs} />
        </MainStack.Navigator>
    );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
    const { isDarkmode } = useTheme();
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
                    backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
                },
            }}
        >
            {/* these icons using Ionicons */}
            <Tabs.Screen
                name="HomeNavigator"
                component={HomeNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <TabBarText focused={focused} title="Home" />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={"md-home"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="AddTripNavigator"
                component={AddTripNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <TabBarText focused={focused} title="Add Trip" />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={"add"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="AnalyticsNavigator"
                component={AnalyticsNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <TabBarText focused={focused} title="Analytics" />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={"ios-bar-chart"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="SettingsNavigator"
                component={SettingsNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <TabBarText focused={focused} title="Settings" />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={"settings"} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default Main;