import express from 'express';

import { getUser, updateProfile } from '../controllers/user.js';
import {
  validateUpdateUser,
} from '../middlewares/validations.js';

const router = express.Router();





router.get('/users/me', getUser);
router.patch('/users/me', validateUpdateUser, updateProfile);

export default router;
