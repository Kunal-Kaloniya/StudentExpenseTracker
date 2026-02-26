import express from "express";
import {addExpense, deleteExpense, fetchExpenses} from "../controller/expenses.controller.js";

const router = express.Router();

router.post('/add-expense', addExpense);
router.delete('/delete-expense/:id', deleteExpense);
router.get('/fetch-expense', fetchExpenses);

export default router;