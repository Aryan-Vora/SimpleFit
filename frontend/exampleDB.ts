import * as SQLite from "expo-sqlite";

let db: any;

export async function initExampleDB() {
  db = await SQLite.openDatabaseAsync("example.db");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);
  await db.execAsync(`
    INSERT INTO items (name) VALUES ('First item');
  `);

}
export async function getExampleDB() {
  const result = await db.getAllAsync("SELECT * FROM items");
  return result;
}
export async function addExampleDB(name: string) {
  await db.runAsync("INSERT INTO items (name) VALUES (?)", [name]);
}
export async function deleteExampleDB(id: number) {
  await db.runAsync("DELETE FROM items WHERE id = ?", [id]);
}
export async function updateExampleDB(id: number, name: string) {
  await db.runAsync("UPDATE items SET name = ? WHERE id = ?", [name, id]);
}
