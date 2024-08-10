import { Text, View } from "react-native";
import { Link } from "expo-router";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { getDatabase, ref, onValue, get, child,set } from "firebase/database";
import {app} from "@/constants/firebase"
import { useState } from "react";

const SingleWord = ({word}:any)=>{
  return <Link href={{pathname:"/oneWord",params:{word:word}}}><Text>{word}</Text></Link>
}

export default function Index() {
  const dbRef = ref(getDatabase(app));
  const [words,setwords] = useState([]);
  get(child(dbRef, 'words/')).then((snapshot) => {
    if (snapshot.exists()) {
      var x = snapshot.val()
      console.log(x);
      setwords(x);
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
    <ScrollView>
      <FlatList data={words} renderItem={({item})=><SingleWord word={item}></SingleWord>} 
      keyExtractor={(item)=>item}/>
    </ScrollView>
    </View>
  );
}

