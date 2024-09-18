import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter, Stack } from 'expo-router'

import { firebase_auth } from '@/constants/firebase'
import LoadingComponent from '@/components/LoadingComponent';

export default function _layout(){  
  const [loading, setLoading] = useState(true);

  firebase_auth.authStateReady().then(()=>{
    setLoading(false);
  });

  if(loading){
    return <LoadingComponent></LoadingComponent>;
  }
  else{
    return (
      <Stack></Stack>
    )
  }

}
