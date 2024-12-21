import express from 'express';

import { getUserByIdController, loginUserController, logoutUserController, registerUserController } from '../controllers/user.controller.js';
import { userQueryMiddleware } from '../middlewares/user.middleware.js';
const router = express.Router();

//! Post
router.post('/register', registerUserController);
router.post('/login', loginUserController);

//! Get
router.get('/user',userQueryMiddleware, getUserByIdController);
router.get('/logout',userQueryMiddleware, logoutUserController);

export default router;