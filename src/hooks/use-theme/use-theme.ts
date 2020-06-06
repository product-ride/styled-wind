import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/theme-context';

export function useTheme() {
  const theme = useContext(ThemeContext);

  return theme;
}
