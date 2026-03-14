import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

// --- Auth endpoints ---
export const loginUser = (username) => API.post('/auth/login', { username });
export const logoutUser = () => API.post('/auth/logout-user');

// --- Expense endpoints ---
export const fetchExpenses = () => API.get('/expenses');
export const requestAddExpense = (expenseData) => API.post('/expenses', expenseData);
export const requestDeleteExpense = (id) => API.delete(`expenses/${id}`);

export default API;