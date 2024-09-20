import { Text, View } from "react-native";
import { useLocalSearchParams,Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import WordDefinitions from "@/components/WordDefinitions"
import React from "react";
import Single_Definition from "@/classes/Single_Definition";
import { free_dictionary_api } from "@/classes/Api_Classes";

const apilink:string = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default function oneWord() {
  const params = useLocalSearchParams();
  const word = params.word.toString();

  const [finaldefs, setfinaldefs] = useState<Single_Definition[]|null>([]);

  React.useEffect(
    () => {
      free_dictionary_api.GetDefinition(word)
      .then((defs)=>{
        console.log(defs);
        if(defs.length != 0){
          console.log("Hello");
            setfinaldefs(defs);
        }
        else{
          setfinaldefs(null);
        }
      }).catch((error)=>{
        setfinaldefs(null);
        console.log(error);
      });
    }, []);

  return (
    <WordDefinitions word={word} definitions={finaldefs}></WordDefinitions>
  );
}

