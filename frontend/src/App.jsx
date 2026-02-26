import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import ExpenseForm from './components/ExpenseForm';
import ExpenseChart from './components/ExpenseChart';
import ExpenseList from './components/ExpenseList';

export default function App() {

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/expenses/fetch-expense`);
      setExpenses(response.data.expenses || response.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteExpense = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/expenses/delete-expense/${id}`);
      toast.success(response.data.message || "Expense deleted");

      fetchExpenses();

    } catch (err) {
      toast.error(err.response?.data?.message || "Network Error! Please try later");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">

      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Expense Tracker</h1>
          <p className="text-gray-500">Monitor your campus micro-spends</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">
            <ExpenseForm onExpenseAdded={fetchExpenses} />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">

            <ExpenseChart expenses={expenses} />

            <ExpenseList
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
            />

          </div>
        </div>
      </div>
    </div>
  );
}