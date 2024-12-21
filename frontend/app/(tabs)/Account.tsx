import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Account Tab</Text>
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
