import { api } from './api';

const DEMO_MODE = true;

export const accountService = {
  async getUserDetails() {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
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
      };
    }
    const response = await api.get('/customer/userDetails');
    return response;
  },

  async checkBalance() {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return 125000.50;
    }
    const response = await api.get('/customer/checkBalance');
    return response;
  },

  async updateUserDetails(userData) {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Updated successfully' };
    }
    const response = await api.put('/customer/update', userData);
    return response;
  }
};