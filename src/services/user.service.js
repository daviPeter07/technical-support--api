import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/errorHandler.js';

const prisma = new PrismaClient();

class UserService {

  //register de user
  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role || 'USER'
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new AppError('Email já está em uso', 400);
      }
      throw error;
    }
  }

  //consulta user por id
  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return user;
  }

  //consulta de tecnicos
  async getTechnicians() {
    return prisma.user.findMany({
      where: { role: 'TECHNICIAN' },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
  }

  //validate login por email e senha unicos
  async validateUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Email ou senha incorretos', 401);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
}

export default new UserService();