// server/prisma/seed.ts
import { PrismaClient, Status, Priority } from '@prisma/client';
import {sampleTasks} from './data/task.js';
import { prisma } from '../src/prismaClient.js';

async function main() {
  console.log('🌱 Starting database seeding...');

  // Optional: Clear out any existing tasks to ensure a fresh slate
  await prisma.task.deleteMany();

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