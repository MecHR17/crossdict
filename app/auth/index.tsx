import { Button, Text, View } from "react-native";
import { FlatList, StyleSheet } from "react-native";

import {signOut} from "firebase/auth"
import { getDatabase, ref, onValue, get, child,set,remove } from "firebase/database";
import {app, firebase_auth} from "@/constants/firebase"
import { useState } from "react";
import React from "react";

import WordDisplay from "@/components/WordDisplay";
import WordInput from "@/components/WordInput";
import { useRouter } from "expo-router";

function Hash(str:any) {

  let hash = 0;

  if (str.length == 0) return hash;

  for (var i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }

  return hash.toString();
}

const getWords = ({dbRef,setwords,user}:any)=>{
  React.useEffect(()=>{
    if(!user)
      return;
    get(child(dbRef, Hash(user?.email) + '/words/')).then((snapshot) => {
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
  },[]);
}

export default function Index() {

  const user = firebase_auth.currentUser;
  const router = useRouter();

  const auth = firebase_auth;

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
    remove(ref(db, Hash(user?.email) + '/words/'+word)).catch((error)=>{console.log(error)});
    setinput("");
    removeWord(word);
  }

  const Upload = (event:any) => {
    console.log(input);
    var word = input.toLowerCase();
    set(ref(db, Hash(user?.email) + '/words/' + word), word).catch((error)=>{
      console.log(error);
    });
    setinput("");
    addWord(word);
  }

  const logout = () => {
    signOut(auth);
  }

  getWords({dbRef,setwords,user});

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
        <Button title="Logout" onPress={logout} />
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