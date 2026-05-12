import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = {
    darkBg: '#141010',
    primaryPink: '#c3195d',
    secondaryPink: '#680747',
    white: '#ffffff',
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: colors.primaryPink,
          },
          secondary: {
            main: colors.secondaryPink,
          },
          background: {
            default: isDarkMode ? colors.darkBg : colors.white,
            paper: isDarkMode ? '#1a1a1a' : colors.white,
          },
          text: {
            primary: isDarkMode ? colors.white : colors.darkBg,
          },
        },
        typography: {
          fontFamily: '"Amaranth", "Poppins", "Roboto", sans-serif',
          h5: {
            fontWeight: 700,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                fontFamily: '"Amaranth", sans-serif',
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};