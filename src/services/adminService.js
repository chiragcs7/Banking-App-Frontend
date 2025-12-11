import api from './api';

export const adminService = {
  async getAllCustomers() {
    const response = await api.get('/admin/getCustomers');
    return response.data;
  },

  async createAdmin(adminData) {
    const response = await api.post('/admin', adminData);
    return response.data;
  }
};