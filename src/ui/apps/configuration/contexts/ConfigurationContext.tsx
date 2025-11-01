import { createContext, useContext } from "react";

export interface IConfigurationContext {}

const defaultContext: IConfigurationContext = {};

const ConfigurationContext = createContext<IConfigurationContext>(defaultContext);

export const useConfigurationContext = () => {
    return useContext(ConfigurationContext);
};

export default function ConfigurationProvider({ children }: { children: React.ReactNode }) {
    return (
            <ConfigurationContext.Provider value={{}}>
            {children}
            </ConfigurationContext.Provider>    
    );
}
