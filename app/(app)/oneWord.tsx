import { Text, View } from "react-native";
import { useLocalSearchParams,Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import WordDefinitions from "@/components/WordDefinitions"
import React from "react";
import Single_Definition from "@/classes/Single_Definition";

/*
TODO:
- Introduce classes for handling Single_Definition[]
extraction from JSON api response. (For when one of
the api's are down, or for making changing api's easier)
*/

const apilink:string = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default function oneWord() {
  const params = useLocalSearchParams();
  const word = params.word.toString();
  const [definition,setdefinition] = useState("");

  const defs: Single_Definition[] = [];
  const [finaldefs, setfinaldefs] = useState<Single_Definition[]|null>([]);

  React.useEffect(
    () => {
      fetch(apilink.concat(word.toString()))
      .then(response => response.json())
      .then(json => json[0].meanings)
      .then(meanings => {
        meanings.forEach((element: { partOfSpeech:any,definitions: { definition: any; }[]; }) => {
            element.definitions.forEach((one_definition:any) => {
              defs.push(new Single_Definition(element.partOfSpeech,one_definition.definition));
            });
        });
      })
      .then(()=>{
        if(defs.length != 0){
            setdefinition(defs.join("\n"));
            setfinaldefs(defs);
        }
        else{
          setfinaldefs(null);
        }
      }).catch((error)=>{setfinaldefs(null);});
    }, []);

  return (
    <WordDefinitions word={word} definitions={finaldefs}></WordDefinitions>
  );
}

