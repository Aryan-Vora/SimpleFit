import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

const MacroTrackerScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://late-lamb-30.deno.dev/natural/nutrients?query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      if (isMountedRef.current) {
        setResults(data);
        setQuery('');
      }
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Macro Tracker</Text>
      <Text>Enter a food description to get nutrition information.</Text>
      <TextInput
        placeholder="Enter food (e.g. '1 apple' or '200g chicken')"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />

      {results && results.foods && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Results:</Text>
          {results.foods.map((food: any, index: number) => (
            <View key={index} style={styles.foodItem}>
              <Text style={styles.foodName}>{food.food_name}</Text>
              <Text>
                Serving: {food.serving_qty} {food.serving_unit} (
                {food.serving_weight_grams}g)
              </Text>
              <Text>Calories: {food.calories}</Text>
              <Text>Protein: {food.protein}g</Text>
              <Text>Carbs: {food.carbs}g</Text>
              <Text>Fat: {food.fat}g</Text>
              <Text>Sodium: {food.sodium}mg</Text>
              {food.sugars !== null && <Text>Sugars: {food.sugars}g</Text>}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 5,
    width: '80%',
    padding: 8,
  },
  results: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
});

export default MacroTrackerScreen;
