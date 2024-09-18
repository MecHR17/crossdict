import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

import { FlatList, StyleSheet } from "react-native";

const LoadingComponent = () => {
  return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff"/>
    </View>
  )
}

const styles = StyleSheet.create({
    loadingContainer: {
      alignItems:"center",
      justifyContent:"center",
      flex:1,
    }
  });

export default LoadingComponent