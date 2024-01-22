import { View, Text } from 'react-native'
import {useNetInfo} from "@react-native-community/netinfo";
import React from 'react'

export default function NetworkTesting() {
    const netInfo = useNetInfo();
  return (
    <View>
    <Text>Type: {netInfo.type}</Text>
    <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
  </View>
  )
}