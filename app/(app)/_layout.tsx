import { useAuth } from "@/context/authContext";
import { Stack } from "expo-router"
import { Button, Pressable, View, Text } from "react-native";
import { StyleSheet } from "react-native";

import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler'

const RNPressable = (onPress:any) => {
    const tap = Gesture.Tap().runOnJS(true).onEnd(onPress)

    return  <GestureDetector gesture={tap}>
    <Pressable style={styles.logoutButtonContainer}><Text style={styles.textStyle}>LOGOUT</Text></Pressable>
</GestureDetector>
}

export default function layout(){
    const {user,logout} = useAuth();
    return(
        <GestureHandlerRootView>
        <Stack>
            <Stack.Screen name="index" options={{headerRight:()=>RNPressable(logout)}}></Stack.Screen>
            <Stack.Screen name="oneWord"></Stack.Screen>
        </Stack>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    logoutButtonContainer: {
        width: 80, // Small width for the button
        backgroundColor:"#4444ff",
        padding:5,
        borderRadius:5
      },
    textStyle: {
        color:"white",
        textAlign:"center",
        fontWeight:"bold",
        fontSize:15
    }
})