import { ActivityIndicator, Button, Text, View } from "react-native";
import { FlatList, StyleSheet } from "react-native";

import { getDatabase, ref, onValue, get, child,set,remove } from "firebase/database";
import {app, firebase_auth} from "@/constants/firebase"
import { useContext, useState } from "react";
import React from "react";

import WordDisplay from "@/components/WordDisplay";
import WordInput from "@/components/WordInput";
import { useAuth } from "@/context/authContext";

const getWords = ({dbRef,setwords,user}:any)=>{
  React.useEffect(()=>{
    if(!user)
      return;
    get(child(dbRef, user.uid + '/words/')).then((snapshot) => {
      if (snapshot.exists()) {
        var x = snapshot.val();
        var tmp:string[] = [];
        Object.keys(x).forEach(key => {
          tmp.push(key);
        });
        tmp.sort((a:string,b:string)=>{return a<b?-1:1});
        setwords(tmp);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  },[]);
}

export default function Index() {

  const {user,logout} = useAuth();
  
  const db = getDatabase(app);
  const dbRef = ref(db);
  const [words,setwords] = useState<string[]>([]);
  const [input,setinput] = useState<string>("");

  const addWord = (word:string)=> {
    var tmp = words;
    tmp.push(word);
    tmp.sort((a:string,b:string)=>{return a<b?-1:1});
    setwords(tmp);
  }

  const removeWord = (word:string)=> {
    var tmp = words;
    const index = tmp.indexOf(word);
    if(index > -1){
      tmp.splice(index,1);
    }
    setwords(tmp);
  }

  const Remove = (event:any) => {
    var word = input.toLowerCase();
    console.log(word);
    remove(ref(db, user.uid + '/words/'+word)).catch((error)=>{console.log(error)});
    setinput("");
    removeWord(word);
  }

  const Upload = (event:any) => {
    console.log(input);
    var word = input.toLowerCase();
    set(ref(db, user.uid + '/words/' + word), "").catch((error)=>{
      console.log(error);
    });
    setinput("");
    addWord(word);
  }

  getWords({dbRef,setwords,user});

  if(!user){
    return(<ActivityIndicator size="large" color="#0000ff"/>);
  }

  return (
    <View style={styles.container}>
      <WordInput 
        value={input} 
        onChangeText={setinput} 
        placeholder="Add word..." 
        onAdd={Upload} 
        onRemove={Remove} 
      />
      <FlatList 
        data={words} 
        renderItem={({ item }) => <WordDisplay word={item} />} 
        keyExtractor={(item) => item} 
        contentContainerStyle={styles.contentContainer} 
      />
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={()=>{logout()}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});