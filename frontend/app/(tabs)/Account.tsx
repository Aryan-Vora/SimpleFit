import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { getOnboardingData, addOnboardingData } from "../../database";

export default function AccountScreen() {
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [age, setAge] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getOnboardingData();
      if (!data) {
        // If there's no data, show a placeholder or return early
        setOnboardingData(null);
        return;
      }
      setOnboardingData(data);
      setAge(data.age.toString());
      setBodyWeight(data.bodyWeight.toString());
      setGoalWeight(data.goalWeight.toString());
      setHeightFeet(data.heightFeet ? data.heightFeet.toString() : "");
      setHeightInches(data.heightInches ? data.heightInches.toString() : "");
      setHeightCm(data.heightCm ? data.heightCm.toString() : "");
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    if (
      !bodyWeight ||
      isNaN(Number(bodyWeight)) ||
      !goalWeight ||
      isNaN(Number(goalWeight)) ||
      (!heightFeet && !heightCm) ||
      (heightFeet && isNaN(Number(heightFeet))) ||
      (heightInches && isNaN(Number(heightInches))) ||
      (heightCm && isNaN(Number(heightCm))) ||
      !age ||
      isNaN(Number(age))
    ) {
      Alert.alert("Error", "Please fill all fields correctly.");
      return;
    }

    await addOnboardingData(
      Number(age),
      Number(bodyWeight),
      Number(goalWeight),
      heightFeet ? Number(heightFeet) : null,
      heightInches ? Number(heightInches) : null,
      heightCm ? Number(heightCm) : null
    );

    Alert.alert("Success", "Data updated successfully.");
  };

  if (onboardingData === null) {
    return (
      <View style={styles.container}>
        <Text>No onboarding data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Body Weight"
          value={bodyWeight}
          onChangeText={setBodyWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Goal Weight"
          value={goalWeight}
          onChangeText={setGoalWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (ft)"
          value={heightFeet}
          onChangeText={setHeightFeet}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (in)"
          value={heightInches}
          onChangeText={setHeightInches}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          value={heightCm}
          onChangeText={setHeightCm}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
