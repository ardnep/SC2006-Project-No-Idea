import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import ForgetPassword from "../views/auth/ForgetPassword";

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

export default Auth;
