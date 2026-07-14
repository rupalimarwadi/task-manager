// server/src/routes/taskRoutes.ts
import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateTask, validateId } from '../middleware/validator.js';

const router = Router();

router.get('/', taskController.getTasks);
router.get('/:id', validateId, taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', validateId, validateTask, taskController.updateTask);
router.delete('/:id', validateId, taskController.deleteTask);

export default router;