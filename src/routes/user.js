import express from 'express';

import { getUsers, updateProfile } from '../controllers/user.js';
import {
    validateUpdateUser,
  } from '../middlewares/validations.js';

const router = express.Router();

router.get('/users/me', getUsers);
router.patch('/users/me',validateUpdateUser, updateProfile);

export default router;
