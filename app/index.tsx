import { Text, View } from "react-native";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

export default function Index() {
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

