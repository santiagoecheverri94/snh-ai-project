import Database from 'better-sqlite3';

const db = new Database('tree-api.db');

// Create the tree_nodes table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tree_nodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    parentId INTEGER,
    FOREIGN KEY(parentId) REFERENCES tree_nodes(id)
  );
`);

export default db;
