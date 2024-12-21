import express from 'express';
import { userQueryMiddleware } from '../middlewares/user.middleware.js';
import { createNewTaskController } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/create-task',userQueryMiddleware, createNewTaskController);

export default router