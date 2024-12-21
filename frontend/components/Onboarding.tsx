import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { addOnboardingData } from "../database";

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [unit, setUnit] = useState("imperial");
  const [bodyWeight, setBodyWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [age, setAge] = useState("");

  const handleTextChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, limit: number) =>
    (text: string) => {
      if (text.length <= limit) {
        setter(text);
      }
    };

  const handleSave = () => {
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
      (unit === "metric" && (!heightCm || isNaN(Number(heightCm)))) ||
      !age ||
      isNaN(Number(age))
    ) {
      Alert.alert("Error", "Please fill all fields correctly.");
      return;
    }
    addOnboardingData(
      Number(age),
      Number(bodyWeight),
      Number(goalWeight),
      unit === "imperial" ? Number(heightFeet) : null,
      unit === "imperial" ? Number(heightInches) : null,
      unit === "metric" ? Number(heightCm) : null
    );
    onComplete();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            style={[
              styles.input,
              isNaN(Number(bodyWeight)) && styles.errorInput,
            ]}
            placeholder="Body Weight"
            placeholderTextColor="#999"
            value={bodyWeight}
            onChangeText={handleTextChange(setBodyWeight, 3)}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              isNaN(Number(goalWeight)) && styles.errorInput,
            ]}
            placeholder="Goal Weight"
            placeholderTextColor="#999"
            value={goalWeight}
            onChangeText={handleTextChange(setGoalWeight, 3)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, isNaN(Number(age)) && styles.errorInput]}
            placeholder="Age"
            placeholderTextColor="#999"
            value={age}
            onChangeText={handleTextChange(setAge, 3)}
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
                placeholderTextColor="#999"
                value={heightFeet}
                onChangeText={handleTextChange(setHeightFeet, 1)}
                keyboardType="numeric"
              />
              <TextInput
                style={[
                  styles.heightInput,
                  isNaN(Number(heightInches)) && styles.errorInput,
                ]}
                placeholder="Height (in)"
                placeholderTextColor="#999"
                value={heightInches}
                onChangeText={handleTextChange(setHeightInches, 2)}
                keyboardType="numeric"
              />
            </View>
          )}

          {unit === "metric" && (
            <TextInput
              style={[
                styles.input,
                isNaN(Number(heightCm)) && styles.errorInput,
              ]}
              placeholder="Height (cm)"
              placeholderTextColor="#999"
              value={heightCm}
              onChangeText={handleTextChange(setHeightCm, 3)}
              keyboardType="numeric"
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
