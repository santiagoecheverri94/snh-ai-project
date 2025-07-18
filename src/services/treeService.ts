import Database from 'better-sqlite3';

export interface TreeNode {
  id: number;
  label: string;
  parentId: number | null;
  children: TreeNode[];
}

export function addNode(
  db: Database.Database,
  label: string,
  parentId: number | null
): number {
  if (typeof label !== 'string' || !label.trim()) {
    throw new Error('Missing or invalid `label`');
  }

  // If parentId is set, check it's a positive number and exists
  if (parentId !== null) {
    if (
      typeof parentId !== 'number' ||
      !Number.isInteger(parentId) ||
      parentId <= 0
    ) {
      throw new Error('`parentId` must be a positive integer');
    }
    const parent = db
      .prepare('SELECT id FROM tree_nodes WHERE id = ?')
      .get(parentId);
    if (!parent) {
      throw new Error('Specified `parentId` does not exist');
    }
  }

  const stmt = db.prepare(
    'INSERT INTO tree_nodes (label, parentId) VALUES (?, ?)'
  );
  const info = stmt.run(label, parentId);
  return Number(info.lastInsertRowid);
}

function getAllNodes(db: Database.Database): TreeNode[] {
  const rows = db
    .prepare('SELECT id, label, parentId FROM tree_nodes')
    .all();
  return rows.map((row: any) => ({
    id: row.id,
    label: row.label,
    parentId: row.parentId,
    children: []
  }));
}

export function getTree(db: Database.Database): TreeNode[] {
  const nodes = getAllNodes(db);
  const nodeMap: Record<number, TreeNode> = {};
  const roots: TreeNode[] = [];

  nodes.forEach((node) => {
    node.children = [];
    nodeMap[node.id] = node;
  });

  nodes.forEach((node) => {
    if (node.parentId == null) {
      roots.push(node);
    } else if (nodeMap[node.parentId]) {
      nodeMap[node.parentId].children.push(node);
    }
  });

  return roots;
}
