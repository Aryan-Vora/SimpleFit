import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const [unit, setUnit] = useState("imperial");
  const [bodyWeight, setBodyWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const router = useRouter();

  const handleSave = () => {
    // Validate inputs
    if (
      !bodyWeight ||
      isNaN(Number(bodyWeight)) ||
      !goalWeight ||
      isNaN(Number(goalWeight)) ||
      (unit === "imperial" &&
        (!heightFeet ||
          isNaN(Number(heightFeet)) ||
          !heightInches ||
          isNaN(Number(heightInches)))) ||
      (unit === "metric" && (!heightCm || isNaN(Number(heightCm))))
    ) {
      Alert.alert("Error", "Please fill all fields correctly.");
      return;
    }
    // ...code to save data...
    router.replace("/(tabs)/Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={unit === "imperial" ? styles.radioSelected : styles.radio}
          onPress={() => setUnit("imperial")}
        >
          <Text>Imperial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={unit === "metric" ? styles.radioSelected : styles.radio}
          onPress={() => setUnit("metric")}
        >
          <Text>Metric</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, isNaN(Number(bodyWeight)) && styles.errorInput]}
        placeholder="Body Weight"
        value={bodyWeight}
        onChangeText={setBodyWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, isNaN(Number(goalWeight)) && styles.errorInput]}
        placeholder="Goal Weight"
        value={goalWeight}
        onChangeText={setGoalWeight}
        keyboardType="numeric"
      />
      {unit === "imperial" && (
        <View style={styles.heightContainer}>
          <TextInput
            style={[
              styles.heightInput,
              isNaN(Number(heightFeet)) && styles.errorInput,
            ]}
            placeholder="Height (ft)"
            value={heightFeet}
            onChangeText={setHeightFeet}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.heightInput,
              isNaN(Number(heightInches)) && styles.errorInput,
            ]}
            placeholder="Height (in)"
            value={heightInches}
            onChangeText={setHeightInches}
            keyboardType="numeric"
          />
        </View>
      )}
      {unit === "metric" && (
        <TextInput
          style={[styles.input, isNaN(Number(heightCm)) && styles.errorInput]}
          placeholder="Height (cm)"
          value={heightCm}
          onChangeText={setHeightCm}
          keyboardType="numeric"
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  radio: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  radioSelected: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  imperialInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heightInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    maxWidth: "48%",
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
