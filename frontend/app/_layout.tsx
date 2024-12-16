import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export type RootStackParamList = {
  "(tabs)": undefined;
};
export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Onboarding" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
