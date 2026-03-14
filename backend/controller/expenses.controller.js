import { Expense } from "../models/expense.model.js";

const fetchExpenses = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        const expenses = await Expense.find({ owner: userId }).sort({ date: -1 });

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
            category,
            owner: req.userId
        });
        const savedExpense = await newExpense.save();
        res.status(201).json({ message: "Expense saved", savedExpense });

    } catch (err) {
        res.status(500).json({ message: "Server Error! Unable to add expense", error: err });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        const expense = await Expense.findOneAndDelete({ owner: userId, _id: req.params.expenseId }).select('title amount category date -_id');
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted", deletedExpense: expense });
    } catch (err) {
        res.status(500).json({ message: "Server Error! Unable to delete expense", error: err });
    }
}

export { fetchExpenses, addExpense, deleteExpense };