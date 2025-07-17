import Database from 'better-sqlite3';

export function getDb(dbPath: string = 'tree-api.db') {
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS tree_nodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      parentId INTEGER,
      FOREIGN KEY(parentId) REFERENCES tree_nodes(id)
    );
  `);
  return db;
}
