import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import {
  createTicket,
  getUserTickets,
  getAllTickets,
  updateTicket,
  getCategories
} from '../controllers/ticket.controller.js';

const router = express.Router();

//rota de consulta pra categoria de chamado
router.get('/categories', getCategories);

router.use(authenticate);

//role de user pode criar ticket e pegar os tickets que ele mesmo criou
router.post('/', createTicket);
router.get('/my-tickets', getUserTickets);

//roles autorizadas pra mudar e consultar os chamados
router.get('/', authorize(['TECHNICIAN', 'ADMIN']), getAllTickets);
router.put('/:id', authorize(['TECHNICIAN', 'ADMIN']), updateTicket);

export default router;