import { Text, View } from "react-native";
import { useLocalSearchParams,Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

const apilink:string = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default function oneWord() {
  const params = useLocalSearchParams();
  const word = params.word;
  const [definition,setdefinition] = useState("");

  const defs: any[] = [];

  fetch(apilink.concat(word.toString()))
  .then(response => response.json())
  .then(json => json[0].meanings)
  .then(meanings => {
    meanings.forEach((element: { definitions: { definition: any; }[]; }) => {
        defs.push(element.definitions[0].definition);
    });
  })
  .then(()=>{
    if(defs.length != 0){
        setdefinition(defs.join("\n"));
    }
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>{word}</Text>
    <Text>{definition}</Text>
    </View>
  );
}

