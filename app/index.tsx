import { Text, View } from "react-native";
import { Link } from "expo-router";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { getDatabase, ref, onValue, get, child,set } from "firebase/database";
import {app} from "@/constants/firebase"
import { useState } from "react";
import React from "react";

import WordDisplay from "@/components/WordDisplay";

const SingleWord = ({word}:any)=>{
  return <Link href={{pathname:"/oneWord",params:{word:word}}}><Text>{word}</Text></Link>
}

export default function Index() {
  const dbRef = ref(getDatabase(app));
  const [words,setwords] = useState([]);
  React.useEffect(
    () => {
      get(child(dbRef, 'words/')).then((snapshot) => {
        if (snapshot.exists()) {
          var x = snapshot.val()
          setwords(x);
          console.log(x);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }, []);
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <ScrollView>
      <FlatList data={words} renderItem={({item})=><WordDisplay word={item}/>} 
      keyExtractor={(item)=>item}/>
    </ScrollView>
    </View>
  );
}

