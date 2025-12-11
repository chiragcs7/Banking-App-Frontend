import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, FileText, MapPin, Calendar, CreditCard, Building, TrendingUp } from 'lucide-react';
import { accountService } from '../../services/accountService';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const data = await accountService.getUserDetails();
      setUserData(data);
    } catch (err) {
      setError('Failed to fetch user details');
      // Demo data fallback
      setUserData({
        customerName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '9876543210',
        pan: 'ABCDE1234F',
        address: '123 Main Street, Mumbai',
        pincode: '400001',
        birthDate: '1990-05-15',
        accountNumber: 'ACC1234567890',
        accountType: 'Savings',
        interestRate: 4.5,
        branchName: 'Mumbai Central'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await accountService.updateUserDetails(userData);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const InfoField = ({ icon: Icon, label, value, editable = false, name }) => (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        {editing && editable ? (
          <input
            type="text"
            name={name}
            value={userData?.[name] || ''}
            onChange={(e) => setUserData({ ...userData, [name]: e.target.value })}
            className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        ) : (
          <p className="font-medium text-gray-800">{value || 'N/A'}</p>
        )}
      </div>
    </div>
  );

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
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="btn-primary"
                  disabled={loading}
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={() => setEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField icon={User} label="Full Name" value={userData?.customerName} editable name="customerName" />
          <InfoField icon={Mail} label="Email" value={userData?.email} editable name="email" />
          <InfoField icon={Phone} label="Phone" value={userData?.phoneNumber} editable name="phoneNumber" />
          <InfoField icon={FileText} label="PAN Number" value={userData?.pan} />
          <InfoField icon={MapPin} label="Address" value={userData?.address} editable name="address" />
          <InfoField icon={MapPin} label="Pincode" value={userData?.pincode} editable name="pincode" />
          <InfoField icon={Calendar} label="Date of Birth" value={userData?.birthDate} />
          <InfoField icon={CreditCard} label="Account Number" value={userData?.accountNumber} />
          <InfoField icon={Building} label="Account Type" value={userData?.accountType} />
          <InfoField icon={TrendingUp} label="Interest Rate" value={`${userData?.interestRate}%`} />
          <InfoField icon={Building} label="Branch" value={userData?.branchName} />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700">
        <p className="text-sm">
          🔒 Your personal and financial information is secured with bank-grade encryption.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;