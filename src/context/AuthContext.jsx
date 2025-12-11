import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = authService.getToken();
    if (token) {
      setIsAuthenticated(true);
      const userData = authService.getCurrentUser();
      setUser(userData);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      setIsAuthenticated(true);
      setUser(result.user);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (data) => {
    return await authService.register(data);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};