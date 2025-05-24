import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async (data) => {
  return await prisma.user.create({ data });
};
