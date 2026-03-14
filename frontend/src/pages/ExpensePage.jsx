import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useExpenseStore } from '../store/useExpenseStore.js';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseChart from '../components/ExpenseChart.jsx';
import ExpenseList from '../components/ExpenseList.jsx';

export default function ExpensePage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);

  useEffect(() => {
    if (!currentUser) return;

    getAllExpenses();
  }, [currentUser]);

  return (
    <div className="min-h-screen w-4/5 bg-gray-50 p-8 font-sans text-gray-800">

      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Expense Tracker</h1>
          <p className="text-gray-500">Monitor your campus micro-spends</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">
            <ExpenseForm />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">

            <ExpenseChart />

            <ExpenseList />

          </div>
        </div>
      </div>
    </div>
  );
}