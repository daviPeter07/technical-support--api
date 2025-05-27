import express from 'express';
import cors from "cors"
//import de rotas
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import ticketRoutes from './src/routes/ticket.routes.js'
//tratamento de erros de negocios
import errorHandler from './src/utils/errorHandler.js';

const app = express();
app.use(cors())
app.use(express.json());

//rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

//middleware de erro
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Is runing ${PORT}`);
});