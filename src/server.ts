import express from 'express';
import path from 'path';
import {router as treeRouter} from './routes/tree';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the tree API routes
app.use('/api/tree', treeRouter);

// Serve the frontend when ready (just a placeholder for now)
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
