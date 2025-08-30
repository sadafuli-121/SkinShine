'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, authService } from '@/lib/auth';
import { useLoading } from '@/hooks/use-loading';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticating: boolean;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { isLoading: loading, withLoading } = useLoading(true);
  const { isLoading: isAuthenticating, withLoading: withAuth } = useLoading(false);

  useEffect(() => {
    withLoading(async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await withAuth(async () => {
      const user = await authService.login({ email, password });
      setUser(user);
    });
  }, [withAuth]);

  const register = useCallback(async (userData: any) => {
    await withAuth(async () => {
      const user = await authService.register(userData);
      setUser(user);
    });
  }, [withAuth]);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    await withLoading(async () => {
      const updatedUser = await authService.updateProfile(user.id, updates);
      setUser(updatedUser);
    });
  }, [user, withLoading]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading, 
      isAuthenticating,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}