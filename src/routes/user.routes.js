import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import { getUsers, getTechnicians } from '../controllers/user.controller.js';

const router = express.Router();
router.use(authenticate);

router.get('/', authorize(['ADMIN']), getUsers);
router.get('/technicians', getTechnicians);

export default router;