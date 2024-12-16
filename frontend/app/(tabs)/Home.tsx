import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <Link href="/(tabs)/Example" style={styles.link}>
        Go to Example Screen
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
    textAlign: "center",
  },
  link: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
