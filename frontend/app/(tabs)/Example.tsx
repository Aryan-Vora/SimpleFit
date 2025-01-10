import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { initExampleDB, addExampleDB, deleteExampleDB, updateExampleDB, getExampleDB } from "../../exampleDB";

const exampleScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      await initExampleDB();
      await fetchItems();
    })();
  }, []);

  async function fetchItems() {
    try {
      const result = await getExampleDB();
      console.log('Fetched items:', result.rows._array);
      setItems(result.rows._array);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  async function handleAdd() {
    try {
      console.log('Adding new item...');
      await addExampleDB("New item");
      const result = await getExampleDB();
      console.log('Updated items after add:', result.rows._array);
      setItems(result.rows._array);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  async function handleUpdate(id: number) {
    await updateExampleDB(id, "Updated item");
    await fetchItems();
  }

  async function handleDelete(id: number) {
    await deleteExampleDB(id);
    await fetchItems();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DB operations test</Text>
      <Button
        title="Add Item"
        onPress={handleAdd}
      />
      {items.map((item: any) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={() => handleUpdate(item.id)}>Update</Text>
            <Text style={styles.buttonText} onPress={() => handleDelete(item.id)}>Delete</Text>
          </View>
        </View>
      ))}
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
  itemContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    color: '#007AFF',
    marginLeft: 10,
  },
});

export default exampleScreen;
