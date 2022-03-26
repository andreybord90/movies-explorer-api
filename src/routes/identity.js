import express from 'express';

import { login, createUser } from '../controllers/user.js';
import {
  validateLogin, validateCreateUser
} from '../middlewares/validations.js';
const router = express.Router();




router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

export default router;
