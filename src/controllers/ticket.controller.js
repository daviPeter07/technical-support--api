import prisma from '../utils/prisma.js';

export const createTicket = async (req, res, next) => {
  try {
    //so faz o chamado se o user existir
    const { title, description, priority, categoryId } = req.body;
    const userId = req.user.id;

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority,
        categoryId,
        userId,
        status: 'ABERTO'
      },
      include: {
        category: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

//consulta de chamados de user:id
export const getUserTickets = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const tickets = await prisma.ticket.findMany({
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
    
    res.json(tickets);
  } catch (error) {
    next(error);
  }
};

//consulta de todos os chamados
export const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await prisma.ticket.findMany({
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
    res.json(tickets);
  } catch (error) {
    next(error);
  }
};

//alteração de chamados
export const updateTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, assignedToId, priority } = req.body;

    const ticket = await prisma.ticket.update({
      where: { id: parseInt(id) },
      data: {
        status,
        assignedToId: assignedToId ? parseInt(assignedToId) : null,
        priority
      },
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

    res.json(ticket);
  } catch (error) {
    next(error);
  }
};

//consulta de categorias
export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};