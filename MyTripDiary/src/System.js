import { NavigationContainer } from "@react-navigation/native";

import Loading from "./views/utils/Loading";
import Auth from "./navigators/AuthNavigator";
import Main from "./navigators/MainTabsNavigator";

// import initializeFirebaseApp from "./controllers/FirebaseController";
// initializeFirebaseApp();

import { AuthContext } from "./provider/AuthProvider";


import React, { useContext, useEffect } from "react";
import { fetchAllTrips } from "./controllers/SavedTripsController";


/**
 * A function component that renders a NavigationContainer containing 
 * the app's main components based on the current user's authentication status.
 * @return {JSX.Element} A NavigationContainer component containing Loading, Auth or Main components based on the user's authentication status.
 */
export default () => {
    const auth = useContext(AuthContext);
    const user = auth.user;

    useEffect(() => {
        fetchAllTrips();
    }, []);

    return (
        <NavigationContainer>
            {user == null && <Loading />}
            {user == false && <Auth />}
            {user == true && (
                <>
                    <Main />
                </>)}
        </NavigationContainer>
    );
};