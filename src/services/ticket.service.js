import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/errorHandler.js';

const prisma = new PrismaClient();

class TicketService {

  //criação de ticket recebe dados do chamado e id do usuario
  async createTicket(ticketData, userId) {
    try {
      return await prisma.ticket.create({
        data: {
          title: ticketData.title,
          description: ticketData.description,
          priority: ticketData.priority || 'MEDIA',
          status: 'ABERTO',
          categoryId: ticketData.categoryId,
          userId
        },
        include: {
          category: true,
          createdBy: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new AppError('Categoria ou usuário inválido', 400);
      }
      throw error;
    }
  }

  //consulta ticket:id
  async getTicketById(id) {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true
          }
        },
        assignedTo: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!ticket) {
      throw new AppError('Chamado não encontrado', 404);
    }

    return ticket;
  }

  //consulta de chamados por user:id
  async getUserTickets(userId) {
    return prisma.ticket.findMany({
      where: { userId },
      include: {
        category: true,
        assignedTo: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  //consulta de todos os chamados
  async getAllTickets() {
    return prisma.ticket.findMany({
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true
          }
        },
        assignedTo: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  //edit de chamados
  async updateTicket(id, updateData) {
    try {
      return await prisma.ticket.update({
        where: { id },
        data: updateData,
        include: {
          category: true,
          createdBy: {
            select: {
              id: true,
              name: true
            }
          },
          assignedTo: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new AppError('Chamado não encontrado', 404);
      }
      throw error;
    }
  }

  //consulta de categorias
  async getCategories() {
    return prisma.category.findMany();
  }
}

export default new TicketService();