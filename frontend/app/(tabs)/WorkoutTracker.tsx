import React from "react";
import { View, Text, StyleSheet } from "react-native";

type WorkoutTrackerScreenProps = {};

const WorkoutTrackerScreen = (props: WorkoutTrackerScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>
      <Text>Log and track your workouts here.</Text>
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

export default WorkoutTrackerScreen;
