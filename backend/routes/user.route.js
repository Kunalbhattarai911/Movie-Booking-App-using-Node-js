import express from 'express';
import { deleteUser, getUser, getUserByID, getUserByRole, updateUser } from '../controllers/user.controller.js';
import { updateUserDataValidation } from '../validation/user.validation.js';

const router = express.Router();

router.get("/", getUser),
router.get("/:id",getUserByID)
router.get("/role/:role",getUserByRole)
router.put("/update/:id", updateUserDataValidation, updateUser)
router.delete("/delete/:id", deleteUser)

export default router