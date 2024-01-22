// SplashScreen.js
import React, { useEffect } from 'react';
import { Video } from 'expo-av';
import { View, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Add any logic here to determine when to navigate to the next screen
    setTimeout(() => {

    }, 5000); // 5000 milliseconds = 5 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Progress.CircleSnail
       color={['red', 'yellow', 'green']}
       size={100}
       thickness={12}
     />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
