// server/src/controllers/taskController.ts
import type { Request, Response } from 'express';
import * as taskService from '../services/taskService.js';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = {
      status: req.query.status as any,
      priority: req.query.priority as any,
      sortBy: req.query.sortBy as any,
      order: req.query.order as any,
    };
    const tasks = await taskService.getAllTasksService(filters);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error in getTasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.getTaskByIdService(req.params.id as string);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error in getTaskById:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTask = await taskService.createTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error in createTask:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await taskService.updateTaskService(req.params.id as string, req.body);
    res.status(200).json(updatedTask);
  } catch (error: any) {
    console.error('Error in updateTask:', error);
    if (error.code === 'P2025') { // Prisma code for record not found
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    await taskService.deleteTaskService(req.params.id as string);
    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error: any) {
    console.error('Error in deleteTask:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to delete task' });
  }
};