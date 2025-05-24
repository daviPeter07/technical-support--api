import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
  email.req
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
