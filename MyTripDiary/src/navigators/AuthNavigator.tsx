/**
 * @fileoverview A Navigator component for navigating to authentication views, including Login, Register, and ForgetPassword.
 * @module navigators/AuthNavigator
 * @returns {JSX.Element} The rendered Auth component.
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import ForgetPassword from "../views/auth/ForgetPassword";

/**
 * The stack navigator for the authentication views.
 * @type {Object}
 */
const AuthStack = createNativeStackNavigator();

/**
 * The Auth component.
 * @function
 * @returns {JSX.Element} The rendered Auth component.
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

export default Auth;
