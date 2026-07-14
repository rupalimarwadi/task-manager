// server/src/prismaClient.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// ⚡ ADD THE 'export' KEYWORD HERE!
export const prisma = new PrismaClient({ adapter });