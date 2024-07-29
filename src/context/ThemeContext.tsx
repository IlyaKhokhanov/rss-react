import React from 'react';

export const ThemeContext = React.createContext<{
  isDarkTheme: boolean;
  toggleTheme: () => void;
}>({
  isDarkTheme: false,
  toggleTheme: () => {},
});
