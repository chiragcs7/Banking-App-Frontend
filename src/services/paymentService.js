import { api } from './api';

const DEMO_MODE = true;

export const paymentService = {
  async makePayment(paymentData) {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, message: 'Payment successful', result: 'Success' };
    }
    const response = await api.post('/customer/payment', paymentData);
    return response;
  },

  async getPaymentHistory(numberOfPayments = 10) {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        { id: 1, fromAccNo: 'ACC1234567890', toAccNo: 'ACC9876543210', amount: 5000, date: '2024-12-10T14:30:00', result: 'Success' },
        { id: 2, fromAccNo: 'ACC1234567890', toAccNo: 'ACC5555555555', amount: 2500, date: '2024-12-09T10:15:00', result: 'Success' },
        { id: 3, fromAccNo: 'ACC1234567890', toAccNo: 'ACC7777777777', amount: 1000, date: '2024-12-08T16:45:00', result: 'Failed' },
        { id: 4, fromAccNo: 'ACC1234567890', toAccNo: 'ACC3333333333', amount: 7500, date: '2024-12-07T11:20:00', result: 'Success' },
        { id: 5, fromAccNo: 'ACC1234567890', toAccNo: 'ACC1111111111', amount: 3200, date: '2024-12-06T09:15:00', result: 'Success' }
      ].slice(0, numberOfPayments);
    }
    const response = await api.get(`/customer/getPaymentHistory/${numberOfPayments}`);
    return response;
  }
};