// server/prisma/seed.ts
import { PrismaClient, Status, Priority } from '@prisma/client';

import { prisma } from '../src/prismaClient.js';

async function main() {
  console.log('🌱 Starting database seeding...');

  // Optional: Clear out any existing tasks to ensure a fresh slate
  await prisma.task.deleteMany();

  const sampleTasks = [
    {
      title: 'Set up full-stack project architecture',
      description: 'Initialize server, configure TypeScript compiler settings, and install workspace dependencies.',
      status: Status.DONE,
      priority: Priority.HIGH,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      title: 'Design PostgreSQL schema definitions',
      description: 'Set up custom Enums for priorities and implement explicit VarChar caps using Prisma modifiers.',
      status: Status.IN_PROGRESS,
      priority: Priority.HIGH,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    },
    {
      title: 'Develop Express controller handlers',
      description: 'Implement robust CRUD routing logic with strict validation checks on parameter payload IDs.',
      status: Status.TODO,
      priority: Priority.MEDIUM,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    },
    {
      title: 'Construct responsive React core view components',
      description: 'Build interactive form sub-modules and clear tabular state wrappers optimized for scanning.',
      status: Status.TODO,
      priority: Priority.MEDIUM,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      title: 'Write project developer documentation',
      description: 'Document step-by-step onboarding guidelines and terminal commands required for setup.',
      status: Status.TODO,
      priority: Priority.LOW,
      dueDate: null, // Optional field
    },
  ];

  for (const task of sampleTasks) {
    const createdTask = await prisma.task.create({ data: task });
    console.log(`✅ Created task: "${createdTask.title}" with ID: ${createdTask.id}`);
  }

  console.log('🏁 Seeding operation finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });