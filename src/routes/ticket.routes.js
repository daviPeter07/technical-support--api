import express from 'express';
import * as ticketController from '../controllers/ticket.controller.js';

const router = express.Router();

router.get('/', ticketController.listTickets);
router.get('/:id', ticketController.getTicket);
router.post('/', ticketController.createTicket);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

export default router;
