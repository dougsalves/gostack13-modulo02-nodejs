import 'reflect-metadata';
import './database';

import express from 'express';
import routes from './routes';

const app = express();
const port = 3333;

app.use(express.json());
app.use(routes);

app.get('/', (request, response) =>
  response.json({ message: 'Hello Gostack' }),
);

app.listen(port, () => console.log(`Server running on port ${port}`));
