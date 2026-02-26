export default function ExpenseList({ expenses, onDeleteExpense }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Spends</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Export CSV</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm">
                            <th className="px-6 py-3 font-medium">Item</th>
                            <th className="px-6 py-3 font-medium">Category</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium">Amount</th>
                            <th className="px-6 py-3 font-medium text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {expenses.length !== 0 && expenses.map((expense) => (
                            <tr key={expense._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-800">{expense.title}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                        {expense.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900">₹{expense.amount}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                        onClick={() => onDeleteExpense(expense._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}