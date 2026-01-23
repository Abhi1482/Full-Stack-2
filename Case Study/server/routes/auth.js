import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { validateRegister, validateLogin } from '../utils/validators.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);

// Protected routes
router.get('/me', protect, getMe);

export default router;
