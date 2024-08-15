import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter, Stack } from 'expo-router'

import { firebase_auth } from '@/constants/firebase'

const _layout = () => {
  const user = firebase_auth.currentUser;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);

  firebase_auth.authStateReady().then(()=>{
    setLoading(false);
  });

  if(loading){
    return <ActivityIndicator size="large" color="#0000ff"/>;
  }

  if(!user){
    router.replace("/");
    return <ActivityIndicator size="large" color="#0000ff"/>;
  }
  else{
    return (
      <Stack></Stack>
    )
  }

}
