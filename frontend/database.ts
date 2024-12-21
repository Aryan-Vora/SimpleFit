import { openDatabaseAsync } from "expo-sqlite";

let db: any;

export async function initDatabase() {
  try {
    db = await openDatabaseAsync("simplefit.db");
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
  await db.runAsync(
    "INSERT INTO Meals (foodName, quantity, calories, protein, carbs, fat) VALUES(?, ?, ?, ?, ?, ?)",
    [foodName, quantity, calories, protein, carbs, fat]
  );
}

export async function addOnboardingData(
  age: number,
  bodyWeight: number,
  goalWeight: number,
  heightFeet: number | null,
  heightInches: number | null,
  heightCm: number | null
) {
  await db.runAsync(
    `INSERT INTO Onboarding (age, bodyWeight, goalWeight, heightFeet, heightInches, heightCm) 
     VALUES(?, ?, ?, ?, ?, ?)`,

    [age, bodyWeight, goalWeight, heightFeet, heightInches, heightCm]
  );
}

export async function getOnboardingData() {
  try {
    const result = await db.getAsync(
      "SELECT * FROM Onboarding ORDER BY id DESC LIMIT 1"
    );
    return result?.rows?._array[0] || null;
  } catch (error) {
    console.error("Error getting onboarding data:", error);
    return null;
  }
}
