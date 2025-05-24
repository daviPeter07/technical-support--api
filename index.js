import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './src/routes/user.routes.js';
import ticketRoutes from './src/routes/ticket.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/tickets', ticketRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
