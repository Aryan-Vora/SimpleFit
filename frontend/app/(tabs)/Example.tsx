import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ExampleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello from ExampleScreen</Text>
      <Link href="/(tabs)/Home" style={styles.link}>
        Go back to Home screen
      </Link>
      <Link href="/" style={styles.link}>
        Go to Onboarding
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  link: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
