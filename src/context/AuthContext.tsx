
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Provider } from '@supabase/supabase-js';

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('seo_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage');
        localStorage.removeItem('seo_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to authenticate
      // For now, we'll simulate a successful login with basic validation
      
      if (!email || !password) {
        toast.error("Email and password are required");
        return false;
      }
      
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }
      
      // Create a mock user (in a real app, this would come from your backend)
      const newUser = {
        id: crypto.randomUUID(),
        email: email
      };
      
      // Store in localStorage (in production, you'd use a more secure method like HttpOnly cookies)
      localStorage.setItem('seo_user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) {
        console.error("Google login error:", error);
        toast.error("Failed to log in with Google");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to register a new user
      // For now, we'll simulate a successful registration with basic validation
      
      if (!email || !password || !firstName || !lastName) {
        toast.error("All fields are required");
        return false;
      }
      
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }
      
      // Create a mock user
      const newUser = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName
      };
      
      // Store in localStorage
      localStorage.setItem('seo_user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('seo_user');
    setUser(null);
    toast.info("You have been logged out");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
