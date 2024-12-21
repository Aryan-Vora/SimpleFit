import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getOnboardingData } from "../../database";

export default function AccountScreen() {
  const [onboardingData, setOnboardingData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getOnboardingData();
      setOnboardingData(data);
    }
    fetchData();
  }, []);

  const formatHeight = (
    feet: number | null,
    inches: number | null,
    cm: number | null
  ) => {
    if (feet !== null && inches !== null) {
      return `${feet}'${inches}"`;
    }
    if (cm !== null) {
      return `${cm} cm`;
    }
    return "Not set";
  };

  if (!onboardingData) {
    return (
      <View style={styles.container}>
        <Text>No onboarding data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile Information</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>{onboardingData.age} years</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Current Weight</Text>
          <Text style={styles.value}>
            {onboardingData.bodyWeight} {onboardingData.heightCm ? "kg" : "lbs"}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Goal Weight</Text>
          <Text style={styles.value}>
            {onboardingData.goalWeight} {onboardingData.heightCm ? "kg" : "lbs"}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.value}>
            {formatHeight(
              onboardingData.heightFeet,
              onboardingData.heightInches,
              onboardingData.heightCm
            )}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            /* TODO: Navigate to edit screen */
          }}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
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
  infoContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  editButton: {
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
