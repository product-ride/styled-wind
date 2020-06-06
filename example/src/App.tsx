import React from 'react';
import { useTheme } from 'styled-tw';

const App = () => {
  const theme = useTheme();

  return <pre>{JSON.stringify(theme, null, 2)}</pre>;
};

export default App;
