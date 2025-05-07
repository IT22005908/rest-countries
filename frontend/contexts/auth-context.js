'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = Cookies.get('flagify_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        Cookies.remove('flagify_user');
      }
    }
    setLoading(false);
  }, []);

  // In a real app, this would call an API
  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, allow any login
        if (email && password) {
          // Get users from storage
          const storedUsers = Cookies.get('flagify_users');
          let users = [];
          
          if (storedUsers) {
            try {
              users = JSON.parse(storedUsers);
            } catch (error) {
              console.error('Failed to parse users data', error);
            }
          }
          
          // Find user
          const matchedUser = users.find(u => u.email === email);
          
          if (matchedUser && matchedUser.password === password) {
            // Don't include password in user state
            const { password, ...userWithoutPassword } = matchedUser;
            setUser(userWithoutPassword);
            Cookies.set('flagify_user', JSON.stringify(userWithoutPassword), { expires: 7 });
            resolve(userWithoutPassword);
          } else {
            reject(new Error('Invalid email or password'));
          }
        } else {
          reject(new Error('Email and password are required'));
        }
      }, 500); // Simulate network delay
    });
  };

  const register = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          // Get existing users
          const storedUsers = Cookies.get('flagify_users');
          let users = [];
          
          if (storedUsers) {
            try {
              users = JSON.parse(storedUsers);
            } catch (error) {
              console.error('Failed to parse users data', error);
            }
          }
          
          // Check if user already exists
          if (users.some(user => user.email === email)) {
            reject(new Error('User with this email already exists'));
            return;
          }
          
          // Create new user
          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            createdAt: new Date().toISOString()
          };
          
          // Add to users array
          users.push(newUser);
          Cookies.set('flagify_users', JSON.stringify(users), { expires: 30 });
          
          // Return user without password
          const { password: _, ...userWithoutPassword } = newUser;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Name, email, and password are required'));
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('flagify_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);