import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeding database...');

    // await prisma.$connect();

    const users: Prisma.UserCreateInput[] = [
      {
        name: 'foo',
        email: 'foo@email.com',
        password: 'password',
      },
      {
        name: 'bar',
        email: 'bar@email.com',
        password: 'password',
      },
    ];

    const categories: Prisma.CategoryCreateInput[] = [
      {
        name: 'Food',
      },
      {
        name: 'Transportation',
      },
      {
        name: 'Entertainment',
      },
      {
        name: 'Groceries',
      },
    ];

    for (const user of users) {
      await prisma.user.create({ data: user });
    }

    for (const category of categories) {
      await prisma.category.create({ data: category });
    }

    console.log('Seeded database');
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
