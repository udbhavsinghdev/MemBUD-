import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserSettings } from '../types';
import { defaultUserProfile, defaultUserSettings } from '../mock/initialData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile;
  settings: UserSettings;
  isOnboarded: boolean;
  login: (email?: string, password?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
  exploreDemo: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  updateSettings: (updated: Partial<UserSettings>) => void;
  resetDemoData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('membud_auth') === 'true';
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('membud_onboarded') !== 'false';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('membud_user');
    return saved ? JSON.parse(saved) : defaultUserProfile;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('membud_settings');
    return saved ? JSON.parse(saved) : defaultUserSettings;
  });

  useEffect(() => {
    localStorage.setItem('membud_auth', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('membud_onboarded', isOnboarded.toString());
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem('membud_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('membud_settings', JSON.stringify(settings));
  }, [settings]);

  const login = (email?: string) => {
    setIsAuthenticated(true);
    if (email && email.includes('@')) {
      const nameFromEmail = email.split('@')[0];
      setUser((prev) => ({
        ...prev,
        email,
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      }));
    }
  };

  const signup = (name: string, email: string) => {
    setIsAuthenticated(true);
    setIsOnboarded(false);
    setUser((prev) => ({
      ...prev,
      name: name || 'Alex Rivera',
      email: email || 'alex.rivera@antigravity.ai'
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  const exploreDemo = () => {
    setUser(defaultUserProfile);
    setIsAuthenticated(true);
    setIsOnboarded(true);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const updateSettings = (updated: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setUser(defaultUserProfile);
    setSettings(defaultUserSettings);
    setIsAuthenticated(true);
    setIsOnboarded(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        settings,
        isOnboarded,
        login,
        signup,
        logout,
        completeOnboarding,
        exploreDemo,
        updateProfile,
        updateSettings,
        resetDemoData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
