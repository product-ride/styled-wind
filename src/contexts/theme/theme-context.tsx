import React, { FC, ReactNode, createContext } from 'react';
import { Theme } from '../../theme/theme';
import { DEFAULT_THEME } from '../../theme/default';

export interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

const ThemeContext = createContext<Theme>(DEFAULT_THEME);
const ThemeProvider: FC<ThemeProviderProps> = ({
  theme = DEFAULT_THEME,
  children
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;

export { ThemeContext, ThemeProvider };
