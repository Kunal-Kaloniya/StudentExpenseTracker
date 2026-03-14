import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addExpense, deleteExpense, fetchExpenses } from "../controller/expenses.controller.js";

const router = express.Router();
router.use(verifyToken);

router.get('/', fetchExpenses);
router.post('/', addExpense);
router.delete('/:expenseId', deleteExpense);

export default router;