import { openDatabaseAsync } from "expo-sqlite";

let db: any;

export async function initDatabase() {
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
      username TEXT,
      age INTEGER,
      bodyWeight REAL,
      goalWeight REAL,
      heightFeet REAL,
      heightInches REAL,
      heightCm REAL
    );
  `);
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
  username: string,
  age: number,
  bodyWeight: number,
  goalWeight: number,
  heightFeet: number | null,
  heightInches: number | null,
  heightCm: number | null
) {
  await db.runAsync(
    `INSERT INTO Onboarding (username, age, bodyWeight, goalWeight, heightFeet, heightInches, heightCm) 
     VALUES(?, ?, ?, ?, ?, ?, ?)`,
    [username, age, bodyWeight, goalWeight, heightFeet, heightInches, heightCm]
  );
}
