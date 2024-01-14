import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import WebView from 'react-native-webview';


const HomeScreen = () => {
  return (
    <WebView
      style={{flex: 1,
      justifyContent:'center',
      alignItems: 'center'
    }}
    source={{ uri: 'https://expo.dev' }}
    />
  );
};

export default HomeScreen;
