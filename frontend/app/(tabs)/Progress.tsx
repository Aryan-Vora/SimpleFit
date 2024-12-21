import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ProgressScreenProps = {};

const ProgressScreen = (props: ProgressScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text>View your fitness progress and analytics here.</Text>
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

export default ProgressScreen;
