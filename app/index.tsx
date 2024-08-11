import { Text, View } from "react-native";
import { Link } from "expo-router";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { getDatabase, ref, onValue, get, child,set,remove } from "firebase/database";
import {app} from "@/constants/firebase"
import { useState } from "react";
import React from "react";

import WordDisplay from "@/components/WordDisplay";
import WordInput from "@/components/WordInput";

export default function Index() {
  const db = getDatabase(app);
  const dbRef = ref(db);
  const [words,setwords] = useState<string[]>([]);
  const [input,setinput] = useState<string>("");

  const Remove = (event:any) => {
    var word = input.toLowerCase();
    console.log(word);
    remove(ref(db,'words/'+word)).catch((error)=>{console.log(error)});
    setinput("");
  }

  const Upload = (event:any) => {
    console.log(input);
    var word = input.toLowerCase();
    set(ref(db, 'words/' + word), word).catch((error)=>{
      console.log(error);
    });
    setinput("");
  }

  get(child(dbRef, 'words/')).then((snapshot) => {
    if (snapshot.exists()) {
      var x = snapshot.val();
      var tmp:string[] = [];
      Object.keys(x).forEach(key => {
        tmp.push(x[key]);
      });
      tmp.sort((a:string,b:string)=>{return a<b?-1:1});
      setwords(tmp);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WordInput value={input} onChangeText={setinput} placeholder="Add word..."
      onAdd={Upload} onRemove={Remove}/>
      <FlatList data={words} renderItem={({item})=><WordDisplay word={item}/>} 
      keyExtractor={(item)=>item} contentContainerStyle={styles.contentContainer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});