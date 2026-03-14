import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useExpenseStore } from "../store/useExpenseStore.js";
import { useShallow } from "zustand/react/shallow";

export default function ExpenseForm() {
    const { addExpense, getAllExpenses } = useExpenseStore(
        useShallow((state) => ({
            addExpense: state.addExpense,
            getAllExpenses: state.getAllExpenses
        }))
    );
    const [form, setForm] = useState({
        title: "",
        amount: 0,
        category: ""
    });
    const categoryOptions = [
        "Canteen",
        "Tea/Coffee",
        "Stationery",
        "Travel",
        "Entertainment",
        "Other"
    ];

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleAddExpense = async (e) => {
        e.preventDefault();

        if (!form.title || !form.category || form.amount === 0) {
            toast.error("Please provide all values");
            return;
        }

        const payload = { ...form, amount: Number(form.amount) };

        addExpense(payload);
        setForm({
            title: "",
            amount: 0,
            category: "",
        });
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Log New Expense</h2>

            <form className="space-y-4" onSubmit={handleAddExpense}>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">What did you buy?</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="e.g., Samosa at canteen"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        onChange={handleChange}
                        value={form.title}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Amount (₹)</label>
                    <input
                        name="amount"
                        type="number"
                        placeholder="0.00"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        onChange={handleChange}
                        value={form.amount}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                    <select
                        name="category"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        onChange={handleChange}
                        value={form.category}
                    >
                        <option value="">-- select --</option>
                        {categoryOptions.map((category) => (
                            <option
                                value={category}
                                key={category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
}