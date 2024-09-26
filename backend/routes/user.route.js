import express from 'express';
import { deleteUser, getUser, getUserByID, getUserByRole, updateAdminStatus, updateUser } from '../controllers/user.controller.js';
import { updateUserDataValidation } from '../validation/user.validation.js';
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js';
import { authenticateJWT } from '../middlewares/isSuperAdminAuth.js';

const router = express.Router();

router.get("/", getUser),
router.get("/:id",getUserByID)
router.get("/role/:role",getUserByRole)
router.put("/update/:id", updateUserDataValidation, updateUser)
router.delete("/delete/:id", deleteUser)
router.put("/admin/:id/status", authenticateJWT ,isSuperAdmin, updateAdminStatus);

export default router