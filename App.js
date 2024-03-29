import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./src/Screen/OnboardingScreen";
import HomeScreen from "./src/Screen/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorScreen from "./src/Screen/ErrorScreen";
import MainSplashScreen from "./src/Screen/MainSplashScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  useEffect(async () => {
    try {
      const appData = await AsyncStorage.getItem("isAppFirstLaunched");
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem("isAppFirstLaunched", "false");
      } else {
        setIsAppFirstLaunched(false);
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="MainSplashScreen"
          headerMood="none"
        >
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
          <Stack.Screen name="MainSplashScreen" component={MainSplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
