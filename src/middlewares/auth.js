import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

export const authenticate = async (req, res, next) => {
  try {
    //validação de token esperando o bearer <token>
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token não fornecido');

    //verificação pra ver se user existe no banco
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    if (!user) throw new Error('Usuário não encontrado');

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Não autorizado' });
  }
};

//verifica se o user tem uma ROLE do sistema
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
};