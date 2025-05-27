import prisma from '../utils/prisma.js';

//consulta dos users
export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

//consulta de tecnicos
export const getTechnicians = async (req, res, next) => {
  try {
    const technicians = await prisma.user.findMany({
      where: { role: 'TECHNICIAN' },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    res.json(technicians);
  } catch (error) {
    next(error);
  }
};