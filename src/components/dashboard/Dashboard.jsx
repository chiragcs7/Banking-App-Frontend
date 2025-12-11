import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, RefreshCw, Calendar, Send, History, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { accountService } from '../../services/accountService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const balanceData = await accountService.checkBalance();
      setBalance(balanceData);
    } catch (err) {
      setError('Failed to fetch balance');
      // Demo data fallback
      setBalance(125000.50);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Available Balance', 
      value: balance ? `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '---', 
      icon: DollarSign, 
      color: 'blue' 
    },
    { label: 'Total Transactions', value: '45', icon: TrendingUp, color: 'green' },
    { label: 'Pending', value: '2', icon: RefreshCw, color: 'yellow' },
    { label: 'This Month', value: '₹45,200', icon: Calendar, color: 'purple' }
  ];

  const recentTransactions = [
    { desc: 'Payment to John Smith', amount: -5000, date: '2 hours ago' },
    { desc: 'Salary Credit', amount: 75000, date: 'Yesterday' },
    { desc: 'ATM Withdrawal', amount: -2000, date: '2 days ago' },
    { desc: 'Online Shopping', amount: -3500, date: '3 days ago' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.customerName || 'User'}!</h2>
        <p className="opacity-90">Account: {user?.accountNumber || 'N/A'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            purple: 'bg-purple-100 text-purple-600'
          };
          
          return (
            <div key={idx} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[stat.color]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/payment')}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg flex items-center gap-3 transition-colors"
            >
              <Send className="w-5 h-5" />
              Make Payment
            </button>
            <button 
              onClick={() => navigate('/history')}
              className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 px-4 rounded-lg flex items-center gap-3 transition-colors"
            >
              <History className="w-5 h-5" />
View History
</button>
<button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium py-3 px-4 rounded-lg flex items-center gap-3 transition-colors">
<FileText className="w-5 h-5" />
Download Statement
</button>
</div>
</div>

{/* Recent Activity */}
    <div className="card">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentTransactions.map((txn, idx) => (
          <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
            <div>
              <p className="font-medium text-gray-800">{txn.desc}</p>
              <p className="text-sm text-gray-500">{txn.date}</p>
            </div>
            <p className={`font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
);
};

export default Dashboard;
