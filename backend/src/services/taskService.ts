// server/src/services/taskService.ts
import { prisma } from '../prismaClient.js';
import { Prisma } from '@prisma/client'; // ⚡ Import Prisma's generated type system!

// 1. Let Prisma define the query parameters cleanly
export interface TaskQueryParams {
  status?: Prisma.TaskWhereInput['status'];     // Safely maps to your Status Enum
  priority?: Prisma.TaskWhereInput['priority']; // Safely maps to your Priority Enum
  sortBy?: 'createdAt' | 'dueDate';
  order?: 'asc' | 'desc';
}

// 2. Let Prisma define the input shape directly!
// This automatically handles title, status, priority, and dates perfectly.
export const createTaskService = async (data: Prisma.TaskCreateInput) => {
  return await prisma.task.create({ data });
};

// --- Your other service methods remain the same ---

export const getAllTasksService = async (query: TaskQueryParams) => {
  const { status, priority, sortBy = 'createdAt', order = 'desc' } = query;

  const whereClause: Prisma.TaskWhereInput = {};
  if (status && (status as string).trim() !== "") {
    whereClause.status = status; 
  }  if (priority) whereClause.priority = priority;

  return await prisma.task.findMany({
    where: whereClause,
    orderBy: {
      [sortBy]: order,
    },
  });
};

export const getTaskByIdService = async (id: string) => {
  return await prisma.task.findUnique({ where: { id } });
};

export const updateTaskService = async (id: string, data: Prisma.TaskUpdateInput) => {
  return await prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTaskService = async (id: string) => {
  return await prisma.task.delete({ where: { id } });
};