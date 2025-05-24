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

// Público
router.get('/categories', getCategories);

// Autenticadas
router.use(authenticate);

// Usuários comuns
router.post('/', createTicket);
router.get('/my-tickets', getUserTickets);

// Técnicos e Admin
router.get('/', authorize(['TECHNICIAN', 'ADMIN']), getAllTickets);
router.put('/:id', authorize(['TECHNICIAN', 'ADMIN']), updateTicket);

export default router;