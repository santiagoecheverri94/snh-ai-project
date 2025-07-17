import express from 'express';
import path from 'path';
import {router as treeRouter} from './routes/tree';

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/tree', treeRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
