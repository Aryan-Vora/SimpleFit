import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { addMeal } from "../../database";

type MacroTrackerScreenProps = {};

const MacroTrackerScreen = (props: MacroTrackerScreenProps) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleAddMeal = async () => {
    const qty = parseInt(quantity) || 1;
    const calories = qty * 100;
    const protein = qty * 5;
    const carbs = qty * 10;
    const fat = qty * 2;
    addMeal(foodName, qty, calories, protein, carbs, fat);
    if (isMountedRef.current) {
      setFoodName("");
      setQuantity("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Macro Tracker</Text>
      <Text>Log and track your macro nutrients here.</Text>
      <TextInput
        placeholder="Food Name"
        value={foodName}
        onChangeText={setFoodName}
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          marginVertical: 5,
          width: "80%",
          padding: 8,
        }}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          marginVertical: 5,
          width: "80%",
          padding: 8,
        }}
      />
      <Button title="Add Meal" onPress={handleAddMeal} />
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

export default MacroTrackerScreen;
