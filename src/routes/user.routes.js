import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import { getUsers, getTechnicians } from '../controllers/user.controller.js';

const router = express.Router();
router.use(authenticate);

//rota de autorize de role pra listar os usuarios
router.get('/', authorize(['ADMIN']), getUsers);
//role de tecnicos pode consultar todos os tecnicos 
router.get('/technicians', getTechnicians);

export default router;