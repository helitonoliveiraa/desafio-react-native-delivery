import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ThemeProvider } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { light, dark } from '../styles/themes';

interface Theme {
  currentTheme: typeof light | typeof dark;
  toggleTheme(): void;
}

const ThemeContext = createContext({} as Theme);

export const AppThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    async function loadTheme(): Promise<void> {
      const storagedTheme = await AsyncStorage.getItem('@theme:');

      if (storagedTheme) {
        setTheme(JSON.parse(storagedTheme));
        return;
      }

      setTheme(light);
    }

    loadTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    setTheme(theme.title === 'light' ? dark : light);

    if (theme.title === 'light') {
      await AsyncStorage.setItem('@theme:', JSON.stringify(dark));
    } else {
      await AsyncStorage.setItem('@theme:', JSON.stringify(light));
    }
  }, [theme]);

  const currentTheme = theme;

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): Theme {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must to be used within an AppThemeProvider.');
  }

  return context;
}
