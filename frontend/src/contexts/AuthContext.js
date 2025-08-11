import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mock';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bindaas_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock login - in real app, this would call backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email && password) {
        const loggedInUser = {
          id: 'user_' + Date.now(),
          email: email,
          name: email.split('@')[0],
          isLoggedIn: true
        };
        
        setUser(loggedInUser);
        localStorage.setItem('bindaas_user', JSON.stringify(loggedInUser));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      // Mock registration - in real app, this would call backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (name && email && password) {
        const newUser = {
          id: 'user_' + Date.now(),
          email: email,
          name: name,
          isLoggedIn: true
        };
        
        setUser(newUser);
        localStorage.setItem('bindaas_user', JSON.stringify(newUser));
        return { success: true };
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(mockUser);
    localStorage.removeItem('bindaas_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};