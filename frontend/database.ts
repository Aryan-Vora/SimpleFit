import * as SQLite from "expo-sqlite";

let db: any;

export async function initDatabase() {
  try {
    db = await SQLite.openDatabaseAsync("simplefit.db");
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS Meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        foodName TEXT,
        quantity INTEGER,
        calories INTEGER,
        protein INTEGER,
        carbs INTEGER,
        fat INTEGER
      );
      CREATE TABLE IF NOT EXISTS Onboarding (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age INTEGER,
        bodyWeight REAL,
        goalWeight REAL,
        heightFeet REAL,
        heightInches REAL,
        heightCm REAL
      );
    `);
    return true;
  } catch (error) {
    console.error("Database initialization error:", error);
    return false;
  }
}

export async function addMeal(
  foodName: string,
  quantity: number,
  calories: number,
  protein: number,
  carbs: number,
  fat: number
) {
  try {
    const result = await db.runAsync(
      "INSERT INTO Meals (foodName, quantity, calories, protein, carbs, fat) VALUES (?, ?, ?, ?, ?, ?)",
      [foodName, quantity, calories, protein, carbs, fat]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding meal:", error);
    return null;
  }
}

export async function addOnboardingData(
  age: number,
  bodyWeight: number,
  goalWeight: number,
  heightFeet: number | null,
  heightInches: number | null,
  heightCm: number | null
) {
  try {
    const result = await db.runAsync(
      `INSERT INTO Onboarding (age, bodyWeight, goalWeight, heightFeet, heightInches, heightCm) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [age, bodyWeight, goalWeight, heightFeet, heightInches, heightCm]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding onboarding data:", error);
    return null;
  }
}

export async function getOnboardingData() {
  try {
    const row = await db.getFirstAsync(
      "SELECT * FROM Onboarding ORDER BY id DESC LIMIT 1"
    );
    return row || null;
  } catch (error) {
    console.error("Error getting onboarding data:", error);
    return null;
  }
}
