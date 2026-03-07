import express from "express";
import { createUser, deleteUser } from "../controller/auth.controller.js";

const router = express.Router();

router.use('/create-user', createUser);
router.use('/delete-user/:id', deleteUser);

export default router;