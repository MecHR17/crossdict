import { firebase_auth } from "@/constants/firebase";
import { router, Stack, useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { View } from "react-native";


export default function RootLayout() {
  const [user,setUser] = useState<User|null>(null);
  const auth = firebase_auth;
  const router = useRouter();

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{setUser(user); });
  },[]);

  useEffect(()=>{
    if(user)
      router.replace('/auth/');
    else
      router.replace('/');
  },[user]);

  return (
    <Stack>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="auth"></Stack.Screen>
    </Stack>
  );
}
