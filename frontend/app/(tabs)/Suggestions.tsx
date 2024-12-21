import React from "react";
import { View, Text, StyleSheet } from "react-native";

type SuggestionsScreenProps = {};

const SuggestionsScreen = (props: SuggestionsScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions</Text>
      <Text>Get personalized food and workout suggestions here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SuggestionsScreen;
