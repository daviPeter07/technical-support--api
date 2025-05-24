import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import errorHandler from './utils/errorHandler.js';

const app = express();
app.use(express.json());

//rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

//middleware de erro
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});