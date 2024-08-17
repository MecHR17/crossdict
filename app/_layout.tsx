import { Provider } from "@/context/authContext";
import {Slot } from "expo-router";

export default function RootLayout() {
  return (
    <Provider>
      <Slot></Slot>
    </Provider>
  );
}
