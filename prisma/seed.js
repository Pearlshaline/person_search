const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.person.deleteMany();

  // Seed sample persons
  const persons = [
    {
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria.santos@email.com',
      phone: '+63 912 345 6789',
      age: 28,
      address: 'Quezon City, Metro Manila, Philippines',
    },
    {
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      email: 'juan.delacruz@email.com',
      phone: '+63 917 654 3210',
      age: 35,
      address: 'Makati City, Metro Manila, Philippines',
    },
    {
      firstName: 'Ana',
      lastName: 'Reyes',
      email: 'ana.reyes@email.com',
      phone: '+63 918 111 2222',
      age: 22,
      address: 'Tuguegarao City, Cagayan, Philippines',
    },
    {
      firstName: 'Carlos',
      lastName: 'Mendoza',
      email: 'carlos.mendoza@email.com',
      phone: '+63 920 333 4444',
      age: 41,
      address: 'Cebu City, Cebu, Philippines',
    },
    {
      firstName: 'Liza',
      lastName: 'Garcia',
      email: 'liza.garcia@email.com',
      phone: '+63 915 555 6666',
      age: 30,
      address: 'Davao City, Davao del Sur, Philippines',
    },
  ];

  for (const person of persons) {
    await prisma.person.create({ data: person });
  }

  console.log('✅ Database seeded with', persons.length, 'persons');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
