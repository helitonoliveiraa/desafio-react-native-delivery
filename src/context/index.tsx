import React, { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { light, dark } from '../styles/themes';

interface Theme {
  currentTheme: typeof light | typeof dark;
  toggleTheme(): void;
}

const ThemeContext = createContext({} as Theme);

export const AppThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(dark);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
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
