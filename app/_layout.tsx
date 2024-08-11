import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="oneWord" />
    </Stack>
  );
}
