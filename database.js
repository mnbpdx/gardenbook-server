const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let db;

async function initializeDatabase() {
  try {
    if (!db) {
      db = await open({
        filename: 'garden_book.sqlite',
        driver: sqlite3.Database
      });

      await db.exec(`
        CREATE TABLE IF NOT EXISTS plants (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          scientificName TEXT NOT NULL,
          careLevel TEXT NOT NULL,
          waterFrequency INTEGER NOT NULL
        )
      `);
      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error; // Re-throw the error to be caught in app.js
  }
}

async function getDb() {
  if (!db) {
    await initializeDatabase();
  }
  return db;
}

module.exports = {
  initializeDatabase,
  getDb
}; 