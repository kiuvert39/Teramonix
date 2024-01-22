import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

export default function Loader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, style.container]}>
      <LottieView
       source={ require('../assets/Animation - 1705841961818.json')}
       autoPlay
       loop
      />
        
   </View>
  )
}

const style = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        borderStartColor: 'rbga(0,0,0,0.3'
    }
})