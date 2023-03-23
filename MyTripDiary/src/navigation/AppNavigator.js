import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
//Screens
import Home from "../views/Home";
import TripInfo from "../views/TripInfo";
import AddTrip from "../views/AddTrip";
import PriceEstimatorPopup from "../views/PriceEstimatorPopup";
import CarParkAvailability from "../views/CarParkAvailability";
import TripHistory from "../views/TripHistory";
import EditPrice from "../views/EditPrice";
import Settings from "../views/Settings";
import Analytics from "../views/Analytics";
import Loading from "../views/utils/Loading";
import SavedTrips from "../views/SavedTrips";
import SavedTripInfo from "../views/SavedTripInfo";
// Auth views
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import ForgetPassword from "../views/auth/ForgetPassword";
import { AuthContext } from "../provider/AuthProvider";


// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyBEObzGMQ5oBnM7QTDPMx5S53YZVWkT2CI",
  authDomain: "mytripdiary-186a4.firebaseapp.com",
  databaseURL: "https://mytripdiary-186a4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mytripdiary-186a4",
  storageBucket: "mytripdiary-186a4.appspot.com",
  messagingSenderId: "1034425680288",
  appId: "1:1034425680288:web:ad71dd6aa25aaaecfaa4c5",
  measurementId: "G-QT7Z8H7N8K"
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();

/**
 * Renders the authentication navigation stack with views for login, register, and forget password.
 * @return {JSX.Element} 
 */
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

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
      <MainStack.Screen name="SavedTrips" component={SavedTrips} />
      <MainStack.Screen name="SavedTripInfo" component={SavedTripInfo} />
      <MainStack.Screen name="TripInfo" component={TripInfo} />
      <MainStack.Screen name="TripHistory" component={TripHistory} />
      <MainStack.Screen name="EditPrice" component={EditPrice} />
    </MainStack.Navigator>
  );
};

/**
 * Creates a navigation stack for the Add Trip feature.
 */
const AddTripStack = createNativeStackNavigator();
const AddTripMain = () => {
  return (
    <AddTripStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AddTripStack.Screen name="AddTrip" component={AddTrip} />
      <AddTripStack.Screen name="PriceEstimator" component={PriceEstimatorPopup} />
      <AddTripStack.Screen name="CarParkAvailability" component={CarParkAvailability} />
    </AddTripStack.Navigator>
  )
}

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
        name="Home"
        component={Home}
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
        name="AddTripMain"
        component={AddTripMain}
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
        name="Analytics"
        component={Analytics}
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
        name="Settings"
        component={Settings}
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

/**
 * A function component that renders a NavigationContainer containing 
 * the app's main components based on the current user's authentication status.
 * @return {JSX.Element} A NavigationContainer component containing Loading, Auth or Main components based on the user's authentication status.
 */
export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
