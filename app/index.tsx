import { Text, View } from "react-native";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

import { getDatabase, ref, onValue, get, child,set } from "firebase/database";
import {app} from "@/constants/firebase"

export default function Index() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, 'words/')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
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
      <Link href={{pathname:"/oneWord",params:{word:"Apple"}}}><Text>Apple</Text></Link>
      <Link href={{pathname:"/oneWord",params:{word:"Scrutiny"}}}><Text>Scrutiny</Text></Link>
    </ScrollView>
    </View>
  );
}

