import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { paymentService } from '../../services/paymentService';

const MakePayment = () => {
  const [formData, setFormData] = useState({ toAccNo: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.toAccNo || !formData.amount) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setMessage({ type: 'error', text: 'Amount must be greater than 0' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await paymentService.makePayment({
        toAccNo: formData.toAccNo,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString()
      });
      setMessage({ type: 'success', text: 'Payment successful!' });
      setFormData({ toAccNo: '', amount: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Payment failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Make Payment</h2>

        {message.text && (
          <div className={`px-4 py-3 rounded-lg mb-4 flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
            <button 
              onClick={() => setMessage({ type: '', text: '' })}
              className="ml-auto font-bold"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Account Number *
            </label>
            <input
              type="text"
              value={formData.toAccNo}
              onChange={(e) => setFormData({ ...formData, toAccNo: e.target.value })}
              placeholder="Enter account number"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Payment
              </>
            )}
          </button>
        </form>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Payments are processed instantly. Please verify the account number before proceeding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;