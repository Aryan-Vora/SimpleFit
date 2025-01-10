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
import { getOnboardingData, updateOnboardingData } from "../../database";

export default function AccountScreen() {
  const [formData, setFormData] = useState({
    id: 0,
    age: "",
    bodyWeight: "",
    goalWeight: "",
    heightFeet: "",
    heightInches: "",
    heightCm: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getOnboardingData();
      if (data) {
        setFormData({
          id: data.id || 0, // Handle null/undefined id
          age: data.age?.toString() ?? "",
          bodyWeight: data.bodyWeight?.toString() ?? "",
          goalWeight: data.goalWeight?.toString() ?? "",
          heightFeet: data.heightFeet?.toString() ?? "",
          heightInches: data.heightInches?.toString() ?? "",
          heightCm: data.heightCm?.toString() ?? "",
        });
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      // Validate inputs
      if (!formData.age || !formData.bodyWeight || !formData.goalWeight) {
        Alert.alert("Error", "Please fill in all required fields");
        return;
      }

      const success = await updateOnboardingData(
        formData.id,
        Number(formData.age),
        Number(formData.bodyWeight),
        Number(formData.goalWeight),
        formData.heightFeet ? Number(formData.heightFeet) : null,
        formData.heightInches ? Number(formData.heightInches) : null,
        formData.heightCm ? Number(formData.heightCm) : null
      );

      if (success) {
        Alert.alert("Success", "Profile updated successfully");
        // Refresh data
        const updatedData = await getOnboardingData();
        if (updatedData) {
          setFormData({
            id: updatedData.id,
            age: updatedData.age.toString(),
            bodyWeight: updatedData.bodyWeight.toString(),
            goalWeight: updatedData.goalWeight.toString(),
            heightFeet: updatedData.heightFeet?.toString() ?? "",
            heightInches: updatedData.heightInches?.toString() ?? "",
            heightCm: updatedData.heightCm?.toString() ?? "",
          });
        }
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "An error occurred while saving");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            keyboardType="numeric"
            placeholder="Enter age"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Weight</Text>
          <TextInput
            style={styles.input}
            value={formData.bodyWeight}
            onChangeText={(text) =>
              setFormData({ ...formData, bodyWeight: text })
            }
            keyboardType="numeric"
            placeholder="Enter current weight"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Goal Weight</Text>
          <TextInput
            style={styles.input}
            value={formData.goalWeight}
            onChangeText={(text) =>
              setFormData({ ...formData, goalWeight: text })
            }
            keyboardType="numeric"
            placeholder="Enter goal weight"
          />
        </View>

        {!formData.heightCm ? (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height (feet)</Text>
              <TextInput
                style={styles.input}
                value={formData.heightFeet}
                onChangeText={(text) =>
                  setFormData({ ...formData, heightFeet: text })
                }
                keyboardType="numeric"
                placeholder="Enter feet"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height (inches)</Text>
              <TextInput
                style={styles.input}
                value={formData.heightInches}
                onChangeText={(text) =>
                  setFormData({ ...formData, heightInches: text })
                }
                keyboardType="numeric"
                placeholder="Enter inches"
              />
            </View>
          </>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={formData.heightCm}
              onChangeText={(text) =>
                setFormData({ ...formData, heightCm: text })
              }
              keyboardType="numeric"
              placeholder="Enter height in cm"
            />
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
