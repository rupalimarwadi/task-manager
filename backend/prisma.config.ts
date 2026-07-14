// backend/prisma.config.ts
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    // Swapping 'ts-node' for 'tsx' allows native ESM execution!
    seed: 'tsx prisma/seed.ts', 
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});