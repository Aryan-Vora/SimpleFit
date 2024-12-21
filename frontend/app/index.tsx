import React, { useState, useEffect } from "react";
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
import { useRouter } from "expo-router";
import { initDatabase, addOnboardingData } from "../database";

export default function Index() {
  const [unit, setUnit] = useState("imperial");
  const [bodyWeight, setBodyWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  useEffect(() => {
    initDatabase();
  }, []);

  const handleOnboardingComplete = (user: {
    username: string;
    age: number;
    bodyWeight: number;
    goalWeight: number;
    heightFeet: number | null;
    heightInches: number | null;
    heightCm: number | null;
  }) => {
    addOnboardingData(
      user.username,
      user.age,
      user.bodyWeight,
      user.goalWeight,
      user.heightFeet,
      user.heightInches,
      user.heightCm
    );
  };

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
      (unit === "metric" && (!heightCm || isNaN(Number(heightCm)))) ||
      !age ||
      isNaN(Number(age))
    ) {
      Alert.alert("Error", "Please fill all fields correctly.");
      return;
    }
    // ...code to save data...
    handleOnboardingComplete({
      username: "testUser", // Replace with actual username input
      age: Number(age),
      bodyWeight: Number(bodyWeight),
      goalWeight: Number(goalWeight),
      heightFeet: unit === "imperial" ? Number(heightFeet) : null,
      heightInches: unit === "imperial" ? Number(heightInches) : null,
      heightCm: unit === "metric" ? Number(heightCm) : null,
    });
    router.replace("/(tabs)/Account");
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
            onChangeText={setBodyWeight}
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
            onChangeText={setGoalWeight}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, isNaN(Number(age)) && styles.errorInput]}
            placeholder="Age"
            placeholderTextColor="#999"
            value={age}
            onChangeText={setAge}
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
                onChangeText={setHeightFeet}
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
                onChangeText={setHeightInches}
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
              onChangeText={setHeightCm}
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
