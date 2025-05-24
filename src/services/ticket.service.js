import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getTickets = async () => {
  // buscar todos os tickets com seus relacionamentos
};

export const getTicketById = async (id) => {
  // buscar um único ticket pelo ID
};

export const createTicket = async (data) => {
  // criar um novo ticket
};

export const updateTicket = async (id, data) => {
  // atualizar um ticket existente
};

export const deleteTicket = async (id) => {
  // deletar um ticket
};
