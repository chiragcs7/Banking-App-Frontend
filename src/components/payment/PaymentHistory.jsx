import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { paymentService } from '../../services/paymentService';

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [numPayments, setNumPayments] = useState(10);

  useEffect(() => {
    fetchHistory();
  }, [numPayments]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await paymentService.getPaymentHistory(numPayments);
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch payment history');
      // Demo data fallback
      setHistory([
        { id: 1, fromAccNo: 'ACC1234567890', toAccNo: 'ACC9876543210', amount: 5000, date: '2024-12-10T14:30:00', result: 'Success' },
        { id: 2, fromAccNo: 'ACC1234567890', toAccNo: 'ACC5555555555', amount: 2500, date: '2024-12-09T10:15:00', result: 'Success' },
        { id: 3, fromAccNo: 'ACC1234567890', toAccNo: 'ACC7777777777', amount: 1000, date: '2024-12-08T16:45:00', result: 'Failed' },
        { id: 4, fromAccNo: 'ACC1234567890', toAccNo: 'ACC3333333333', amount: 7500, date: '2024-12-07T11:20:00', result: 'Success' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
          <div className="flex items-center gap-4">
            <select 
              value={numPayments}
              onChange={(e) => setNumPayments(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value={5}>Last 5</option>
              <option value={10}>Last 10</option>
              <option value={20}>Last 20</option>
              <option value={50}>Last 50</option>
            </select>
            <button 
              onClick={fetchHistory}
              className="btn-primary flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-4">
            {error} - Showing demo data
          </div>
        )}

        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No payment history found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">From Account</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">To Account</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(txn.date).toLocaleString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 font-mono">
                      ****{txn.fromAccNo?.slice(-4)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 font-mono">
                      ****{txn.toAccNo?.slice(-4)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-gray-800">
                      ₹{txn.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        txn.result === 'Success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {txn.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
