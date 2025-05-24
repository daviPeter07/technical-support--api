import jwt from 'jsonwebtoken';
import userService from './user.service.js';
import { AppError } from '../utils/errorHandler.js';

class AuthService {
  generateToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );
  }

  async register(userData) {
    return userService.createUser(userData);
  }

  async login(email, password) {
    const user = await userService.validateUser(email, password);
    const token = this.generateToken(user);
    
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new AppError('Token inválido', 401);
      }
      if (error.name === 'TokenExpiredError') {
        throw new AppError('Token expirado', 401);
      }
      throw error;
    }
  }
}

export default new AuthService();