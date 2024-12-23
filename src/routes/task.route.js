import express from 'express';
import { userQueryMiddleware } from '../middlewares/user.middleware.js';
import { createNewTaskController, deleteTaskByIdController, getTaskByUserController, updateTaskDetailsController } from '../controllers/task.controller.js';

const router = express.Router();
//! create task
router.post('/task/create',userQueryMiddleware, createNewTaskController);

//! task byId USER
router.get('/task', userQueryMiddleware, getTaskByUserController);

//! update task
router.put('/task/uptask',userQueryMiddleware, updateTaskDetailsController);

router.delete('/task/deltask', userQueryMiddleware, deleteTaskByIdController);

export default router