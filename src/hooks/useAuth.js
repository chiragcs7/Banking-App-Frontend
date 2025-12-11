import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setLoading(false);
  };

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    setIsAuthenticated(true);
    return result;
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const register = async (data) => {
    return await authService.register(data);
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    checkAuth
  };
};