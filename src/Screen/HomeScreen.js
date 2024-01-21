import React,{useState} from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';


const HomeScreen = () => {

  const [loadingProgress, setLoadingProgress] = useState(0);


  const handleOnLoadProgress = ({ nativeEvent }) => {
  
    setLoadingProgress(nativeEvent.progress);
    console.log(nativeEvent.progress);

  };

  return (
    <>
     {loadingProgress < 1 ? (
        <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.activityIndicator} />
      ) : null}

        <WebView
          style={{flex: 1,
          justifyContent:'center',
          alignItems: 'center',
          marginTop:23}}
          source={{uri: 'https://myaccount.teramonix.com/dashboard'}}
          onLoadProgress={handleOnLoadProgress}
        />
    </>
   
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    height: 2,
  },
  webView: {
    flex: 1,
  },
});

export default HomeScreen;
