/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany();
  const rudra = await prisma.donation.create({
    data: {
        email: 'rudra@email.com',
        count: 5,
        displayName: 'Rudra',
        createdAt: new Date(),
    }
  });

  console.log({ rudra });
}


main().catch(e => console.error(e))