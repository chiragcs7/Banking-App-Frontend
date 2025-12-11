import { api } from './api';

// Demo mode flag
const DEMO_MODE = true; // Set to false when backend is ready

const DEMO_USER = {
  token: 'demo-jwt-token-12345',
  user: {
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
  }
};

export const authService = {
  async register(customerData) {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Registration successful' };
    }
    const response = await api.post('/customer/register', customerData);
    return response;
  },

  async login(credentials) {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (credentials.pan === 'ABCDE1234F' && credentials.password === 'demo123') {
        localStorage.setItem('authToken', DEMO_USER.token);
        localStorage.setItem('userDetails', JSON.stringify(DEMO_USER.user));
        return DEMO_USER;
      } else {
        throw new Error('Invalid credentials. Use PAN: ABCDE1234F, Password: demo123');
      }
    }
    
    const response = await api.post('/login', credentials);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      if (response.user) {
        localStorage.setItem('userDetails', JSON.stringify(response.user));
      }
    }
    return response;
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
  },

  getToken() {
    return localStorage.getItem('authToken');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('userDetails');
    return userStr ? JSON.parse(userStr) : null;
  },

  async updateProfile(profileData) {
    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Profile updated' };
    }
    const response = await api.post('/customer/updateProfile', profileData);
    return response;
  }
};