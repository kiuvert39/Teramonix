import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import WebView from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from "./SplashScreen";
import { Platform, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loader, setloader] = useState(false);
  const [loading, setLoader] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [showErrorScreen, setShowErrorScreen] = useState(false);

  const webViewRef = useRef(null);
  const hight = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;

  const handleWebViewMessage = (event) => {
    const messageFromWebView = event.nativeEvent.data;
  };

  const handleOnLoadProgress = ({ nativeEvent }) => {
    setLoadingProgress(nativeEvent.progress);

    onMessage = { handleWebViewMessage };
  };

  const showToast = (message, type, isConnected) => {
    Toast.show({
      type: isConnected ? "success" : "error",
      text1: message,
      text2: `Network Type: ${type}`,
      visibilityTime: 7000,
      position: "top",
      topOffset: 110,
      customProps: {
        style: {
          backgroundColor: "green",
        },
      },
    });
  };

  const handleConnectivityChange = (isConnected, type) => {
    setIsConnected(isConnected);
    if (!isConnected) {
      showToast("You are offline!", type, isConnected);
    } else {
      showToast("You are online!", type, isConnected);
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

  // const handleError = useCallback(() => {

  //   Alert.alert(
  //     'Network Error',
  //     'application is loading.....',
  //   );
  //   console.log('Network error occurred. Reloading the page.');
  //   setLoader(true);
  //   webViewRef.current && webViewRef.current.reload();

  // }, []);

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;

    if (nativeEvent.code === "ENETUNREACH" || nativeEvent.code === "ENETDOWN") {
      // Handle network errors here
      console.log("Network error: Check your internet connection.");
    }
  };
  const handleReload = useCallback(() => {
    setLoader(true);
    setShowErrorScreen(false); // Hide the ErrorScreen
    webViewRef.current && webViewRef.current.reload();
  }, []);

  const handleError = useCallback(() => {
    Alert.alert("Network Error", "Application is loading.....", [
      { text: "Reload", onPress: handleReload },
    ]);
  }, []);
  return (
    <>
      {showErrorScreen ? (
        <ErrorScreen onReload={handleReload} />
      ) : (
        <WebView
          ref={webViewRef}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
          source={{ uri: "https://myaccount.teramonix.com/dashboard" }}
          onLoadProgress={handleOnLoadProgress}
          onMessage={handleWebViewMessage}
          onLoadStart={() => setloader(true)}
          onLoadEnd={() => setloader(false)}
          onError={handleError}
        />
      )}

      <Toast ref={(ref) => Toast.setRef(ref)} />
      {loader && (
        <Spinner
          cancelable={true}
          visible={loader ? true : null}
          customIndicator={
            <SplashScreen
              size="large"
              color="#fff"
              style={{
                position: "absolute",
                top: hight / 2,
                left: width / 2.2,
              }}
            />
          }
          textStyle={styles.spinnerText}
        />
      )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

const ErrorScreen = ({ onReload }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        Network error: Check your internet connection.
      </Text>
      <Button title="Reload" onPress={onReload} />
    </View>
  );
};

export default HomeScreen;
