import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import {
  signinValidation,
  signupValidation,
} from "../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/signin", signinValidation, login);

export default router;
