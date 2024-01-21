import React,{useState} from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';



const HomeScreen = () => {

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loader, setloader] = useState(false)

  const hight = Dimensions.get('screen').height
  const width = Dimensions.get('screen').width
  const handleWebViewMessage = event => {

    const messageFromWebView = event.nativeEvent.data;

    console.log('Message from WebView:', messageFromWebView);
  };



  const handleOnLoadProgress = ({ nativeEvent }) => {
  
    setLoadingProgress(nativeEvent.progress);
    console.log(nativeEvent.progress);
    onMessage={handleWebViewMessage}

  };

  return (
    <>
     

        <WebView
          style={{flex: 1,
          justifyContent:'center',
          alignItems: 'center',
          marginTop:23}}
          source={{uri: 'https://myaccount.teramonix.com/dashboard'}}
          onLoadProgress={handleOnLoadProgress}
          onMessage={handleWebViewMessage}
          onLoadStart={() => setloader(true)}
          onLoadEnd={() =>setloader(false)}
        />
  
        {
          loader && (
            <Spinner
                visible={loader}
                customIndicator={<ActivityIndicator
                  size="large"
                  color="#fff"
                  style={{
                       position: 'absolute',
                       top: hight / 2,
                       left: width / 2.2,
                      }}
                 />}
                textContent={'Loading...'}
                textStyle={styles.spinnerText}
              />

          )
        }
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
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
