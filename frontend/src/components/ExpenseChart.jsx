import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ExpenseChart({ expenses }) {

    const totalSpend = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

    const categoryTotals = expenses.reduce((acc, current) => {
        const existingCategory = acc.find(item => item.name === current.category);
        if (existingCategory) {
            existingCategory.value += Number(current.amount);
        } else {
            acc.push({ name: current.category, value: Number(current.amount) });
        }
        return acc;
    }, []);

    const COLORS = ['#3b82f6', '#2dd4bf', '#6366f1', '#fb923c', '#8b5cf6', '#dea461'];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full text-center md:text-left">
                <h2 className="text-xl font-semibold mb-2">Spending Overview</h2>
                <p className="text-gray-500 text-sm mb-6">Where your money goes this month</p>

                <div className="text-3xl font-bold text-gray-800 mb-2">
                    ₹{totalSpend}
                </div>
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Total Spent</span>
            </div>

            <div className="w-full md:w-1/2 h-64 flex items-center justify-center">
                {expenses.length === 0 ? (
                    <div className="text-gray-400 text-sm italic border-2 border-dashed border-gray-200 rounded-full w-48 h-48 flex items-center justify-center">
                        No data to chart
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryTotals}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryTotals.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `₹${value}`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}