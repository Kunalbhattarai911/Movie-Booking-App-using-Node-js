import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signupValidation } from '../validation/auth.validation.js';

const router = express.Router();

router.post("/signup", signupValidation,signup)

export default router;