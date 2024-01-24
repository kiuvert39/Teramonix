import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";

export default function MainSplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation) {
      const timeout = setTimeout(() => {
        navigation.replace("HomeScreen");
      }, 5000);

      // Clear the timeout to prevent navigation after the component is unmounted
      return () => clearTimeout(timeout);
    }
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Video
        source={require("../../assets/splashvideo.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls={false} // Set to true if you want to use native controls
        style={{ flex: 1 }}
      />
    </View>
  );
}
