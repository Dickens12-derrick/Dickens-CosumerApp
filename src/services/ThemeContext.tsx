// services/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryLight: string;
  primaryDisabled: string;
  border: string;
  inputBorder: string;
  error: string;
  badgeBackground: string;
  badgeBorder: string;
  shadow: string;
}

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  text: '#1B1B1B',
  textSecondary: '#666666',
  primary: '#1B5E20',
  primaryLight: '#E8F5E9',
  primaryDisabled: '#A5D6A7',
  border: '#E8F5E9',
  inputBorder: '#E0E0E0',
  error: '#D32F2F',
  badgeBackground: '#FFFDE7',
  badgeBorder: '#FFF59D',
  shadow: 'rgba(0,0,0,0.1)',
};

const darkColors: ThemeColors = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#F5F5F5',
  textSecondary: '#B0B0B0',
  primary: '#81C784',
  primaryLight: '#2E7D32',
  primaryDisabled: '#1B5E20',
  border: '#2E7D32',
  inputBorder: '#424242',
  error: '#E57373',
  badgeBackground: '#262410',
  badgeBorder: '#4F4B24',
  shadow: 'rgba(255,255,255,0.05)',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('light');

  // Sync with system theme on load
  useEffect(() => {
    if (systemScheme === 'dark' || systemScheme === 'light') {
      setTheme(systemScheme);
    }
  }, [systemScheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const colors = useMemo(() => (theme === 'light' ? lightColors : darkColors), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
