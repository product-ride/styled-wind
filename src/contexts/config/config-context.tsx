import React, { FC, ReactNode, createContext } from 'react';

export interface ConfigProviderProps {
  config?: any;
  children: ReactNode;
}

const ConfigContext = createContext<any>({});
const ConfigProvider: FC<ConfigProviderProps> = ({ config = {}, children }) => (
  <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
);

export { ConfigContext, ConfigProvider };
