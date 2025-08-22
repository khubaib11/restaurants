'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin-token');
      const userData = localStorage.getItem('admin-user');
      
      if (token && userData) {
        try {
          // Here you would typically validate the token with your backend
          const user = JSON.parse(userData);
          setUser(user);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Failed to parse user data', err);
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-user');
        }
      }
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace this with your actual API call
      // const response = await fetch('/api/admin/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        localStorage.setItem('admin-token', 'mock-jwt-token');
        localStorage.setItem('admin-user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        router.push('/admin');
        return true;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Login failed';
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/admin/login');
  }, [router]);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};