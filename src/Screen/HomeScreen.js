import React,{ useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from './SplashScreen';
import { Platform } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';




const HomeScreen = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loader, setloader] = useState(false)

  const hight = Dimensions.get('screen').height
  const width = Dimensions.get('screen').width

  NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });


  
  const handleWebViewMessage = event => {

    const messageFromWebView = event.nativeEvent.data;

    console.log('Message from WebView:', messageFromWebView);
  };



  const handleOnLoadProgress = ({ nativeEvent }) => {
  
    setLoadingProgress(nativeEvent.progress);
    console.log(nativeEvent.progress);
    onMessage={handleWebViewMessage}

  };

  const showToast = (message, type) => {
    Toast.show({
        type: 'info',
        text1: message,
        text2: `Network Type: ${type}`,
        visibilityTime: 7000,
        position:'top',
        topOffset:110
    });
};

const handleConnectivityChange = (isConnected, type) => {
    setIsConnected(isConnected);
    if (!isConnected) {
        showToast('You are offline!', type);
    } else {
        console.log('connected!!');
        showToast('You are online!', type);
    }
};


const checkConnectivity = async () => {
    if (Platform.OS === "android") {
        try {
            const state = await NetInfo.fetch();
            const type = state.type;
            handleConnectivityChange(state.isConnected, type);
        } catch (error) {
            console.error("Error fetching network info", error);
        }
    } else {
        NetInfo.addEventListener("connectionChange", (state) => {
            handleConnectivityChange(state.isConnected, state.type);
        });
    }
};


useEffect(() => {
    return () => {
        if (Platform.OS === "ios") {
            NetInfo.isConnected.removeEventListener(
                "connectionChange",
                handleConnectivityChange
            );
        }
    };
}, []);

useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
        handleConnectivityChange(state.isConnected, state.type);
    });

    return () => {
        unsubscribe();
    };
}, []);


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
        
         <Toast ref={(ref) => Toast.setRef(ref)}  style={{ marginTop: 35}}/>
        {
          loader && (
            
             <Spinner
              visible={loader}
              customIndicator={<SplashScreen
              size="large"
              color="#fff"
              style={{
              position: 'absolute',
              top: hight / 2,
              left: width / 2.2,
              }}
           />}
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
