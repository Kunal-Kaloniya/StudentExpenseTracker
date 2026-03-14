import { create } from "zustand";
import { requestAddExpense, requestDeleteExpense, fetchExpenses } from "../helper/api.js";
import { toast } from "react-toastify";

export const useExpenseStore = create((set) => ({
    expenses: [],
    loading: false,

    getAllExpenses: async () => {
        try {
            set({ loading: true });
            const response = await fetchExpenses();
            set({ expenses: response.data.expenses || [] });
        } catch (err) {
            console.error(err.response?.data?.message || "Failed to fetch expenses");
        } finally {
            set({ loading: false });
        }
    },

    addExpense: async (formData) => {
        try {
            const response = await requestAddExpense(formData);
            set((state) => ({
                expenses: [...state.expenses, response.data.savedExpense]
            }));
            toast.success(response.data.message || "Expense saved");
        } catch (err) {
            toast.error(err.response?.data?.message || "Network Error! Unable to add expense");
        }
    },

    deleteExpense: async (id) => {
        try {
            const response = await requestDeleteExpense(id);
            set((state) => ({
                expenses: state.expenses.filter((expense) => expense._id !== id)
            }));
            toast.success(response.data.message || "Expense deleted");
        } catch (err) {
            toast.error(err.response?.data?.message || "Network Error! Please try later");
        }
    }
}));