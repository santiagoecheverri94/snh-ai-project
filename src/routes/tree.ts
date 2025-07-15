import { Router } from 'express';

export const router = Router();

// GET /api/tree placeholder
router.get('/', (req, res) => {
  res.json([]);
});

// POST /api/tree placeholder
router.post('/', (req, res) => {
  res.status(201).json({ id: 1 });
});
