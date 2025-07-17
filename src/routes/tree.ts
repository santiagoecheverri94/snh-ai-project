import { Router } from 'express';
import { addNode, getTree } from '../services/treeService';
import { getDb } from '../db';

export const router = Router();
const db = getDb();

router.get('/', (req, res) => {
  const tree = getTree(db);
  res.json(tree);
});

router.post('/', (req, res) => {
  const { label, parentId } = req.body;
  
  try {
    const id = addNode(db, label, parentId ?? null);
    res.status(201).json({ id });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});
