/**
 * @fileoverview The main component for the app's navigation, including bottom tab navigation with tabs for Home, Analytics, Trip History, and Settings.
 * @module navigators/MainTabsNavigator
 * @returns {JSX.Element} The rendered Main component.
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor, Text } from "react-native-rapi-ui";

import { Ionicons } from "@expo/vector-icons";

import SettingsNavigator from "./SettingsNavigator";
import AnalyticsNavigator from "./AnalyticsNavigator";
import HomeNavigator from "./HomeNavigator";
import TripHistoryNavigator from "./TripHistoryNavigator";

/**
 * The stack navigator for the main app navigation.
 * @type {Object}
 */
const MainStack = createNativeStackNavigator();

/**
 * The Main component.
 * @function
 * @returns {JSX.Element} The rendered Main component.
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

/**
 * The bottom tab navigator for the main app navigation.
 * @type {Object}
 */
const Tabs = createBottomTabNavigator();

/**
 * The MainTabs component, which represents the tabs for Home, Analytics, Trip History, and Settings.
 * @function
 * @returns {JSX.Element} The rendered MainTabs component.
 */
const MainTabs = () => {
    const { isDarkmode } = useTheme();

    /**
     * The TabBarText component, which represents the text label for each tab.
     * @function
     * @param {Object} props - The props for the TabBarText component.
     * @returns {JSX.Element} The rendered TabBarText component.
     */
    const TabBarText = (props) => {
        const { isDarkmode } = useTheme();
        return (
            <Text
                fontWeight="bold"
                style={{
                    marginBottom: 5,
                    color: props.focused
                        ? isDarkmode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)",
                    fontSize: 10,
                }}
            >
                {props.title}
            </Text>
        );
    };

    /**
     * The TabBarIcon component, which represents the icon for each tab.
     * @function
     * @param {Object} props - The props for the TabBarIcon component.
     * @returns {JSX.Element} The rendered TabBarIcon component.
     */
    const TabBarIcon = (props) => {
        const { isDarkmode } = useTheme();
        return (
            <Ionicons
                name={props.icon}
                style={{ marginBottom: -7 }}
                size={24}
                color={
                    props.focused
                        ? isDarkmode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)"
                }
            />
        );
    };

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
                name="TripHistoryNavigator"
                component={TripHistoryNavigator}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <TabBarText focused={focused} title="History" />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={"md-newspaper"} />
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