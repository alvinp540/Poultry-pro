import React, { useState } from 'react';
import { Plus, DollarSign, TrendingUp, TrendingDown, Calendar, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function FarmAccounting() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2025-11-10', type: 'income', category: 'Egg Sales', amount: 15000, description: '1000 eggs @ 15/egg' },
    { id: 2, date: '2025-11-10', type: 'expense', category: 'Feed', amount: 8000, description: '200kg feed purchase' },
    { id: 3, date: '2025-11-09', type: 'income', category: 'Chicken Sales', amount: 25000, description: '50 broilers sold' },
    { id: 4, date: '2025-11-08', type: 'expense', category: 'Medication', amount: 3500, description: 'Vaccines and supplements' },
    { id: 5, date: '2025-11-07', type: 'expense', category: 'Labor', amount: 12000, description: 'Worker salaries' },
    { id: 6, date: '2025-11-06', type: 'income', category: 'Egg Sales', amount: 14500, description: '950 eggs sold' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: '', type: 'expense', category: '', amount: '', description: ''
  });

  const addTransaction = () => {
    if (newTransaction.date && newTransaction.category && newTransaction.amount) {
      setTransactions([{ ...newTransaction, id: Date.now(), amount: parseFloat(newTransaction.amount) }, ...transactions]);
      setNewTransaction({ date: '', type: 'expense', category: '', amount: '', description: '' });
      setShowAddForm(false);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  // Expense breakdown
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Revenue trend (last 6 days)
  const revenueTrend = [
    { date: 'Nov 6', revenue: 14500 },
    { date: 'Nov 7', revenue: 0 },
    { date: 'Nov 8', revenue: 0 },
    { date: 'Nov 9', revenue: 25000 },
    { date: 'Nov 10', revenue: 15000 },
    { date: 'Nov 11', revenue: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farm Accounting</h1>
          <p className="text-gray-600">Track expenses, revenue, and profitability in real-time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Income</p>
                <p className="text-3xl font-bold text-green-600">KSh {totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="text-green-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">KSh {totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="text-red-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Net Profit</p>
                <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  KSh {netProfit.toLocaleString()}
                </p>
              </div>
              <DollarSign className={netProfit >= 0 ? 'text-green-400' : 'text-red-400'} size={32} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        </div>

        {/* Add Transaction Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-bold mb-4">Add New Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="text"
                placeholder="Category (e.g., Feed, Egg Sales)"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2 md:col-span-2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addTransaction}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Add Transaction
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'income' ? '+' : '-'}KSh {transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}