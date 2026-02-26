import { Expense } from "../models/expense.model.js";

const fetchExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });

        if (!expenses) {
            return res.status(404).json({ message: "No expenses found!", expenses });
        }

        res.status(200).json({ message: "Expenses fetched successfully", expenses });
    } catch (err) {
        res.status(500).json({ message: "Server Error! Unable to fetch expenses", error: err });
    }
}

const addExpense = async (req, res) => {
    try {
        const { title, amount, category } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: "Insufficient data! Please provide all values" });
        }

        const newExpense = new Expense({
            title,
            amount,
            category
        });
        const savedExpense = await newExpense.save();
        res.status(201).json({ message: "Expense saved", savedExpense });

    } catch (err) {
        res.status(500).json({ message: "Server Error! Unable to add expense", error: err });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server Error! Unable to delete expense", error: err });
    }
}

export { fetchExpenses, addExpense, deleteExpense };