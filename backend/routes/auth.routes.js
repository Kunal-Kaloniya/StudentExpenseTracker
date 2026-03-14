import express from "express";
import { login, deleteUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/login', login);
router.delete('/delete-user/:id', deleteUser);

export default router;