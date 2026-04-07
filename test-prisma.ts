import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Database connected:', result);
  } catch (err) {
    console.error('Prisma connection error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();