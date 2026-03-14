import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addExpense, deleteExpense, fetchExpenses } from "../controller/expenses.controller.js";

const router = express.Router();
router.use(verifyToken);

router.post('/add-expense', addExpense);
router.delete('/delete-expense/:expenseId', deleteExpense);
router.get('/fetch-expense', fetchExpenses);

export default router;