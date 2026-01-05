import { createContext, useContext } from "react";
import type { EntityConfigurationFile, ResourceConfigurationFile } from "./types";

export interface IConfigurationContext {
    selectedEntities?: EntityConfigurationFile[];
    setSelectedEntities?: (files: EntityConfigurationFile[]) => void;
    selectedResources?: ResourceConfigurationFile[];
    setSelectedResources?: (files: ResourceConfigurationFile[]) => void;
};

const defaultContext: IConfigurationContext = {};

const ConfigurationContext = createContext<IConfigurationContext>(defaultContext);

export const useConfigurationContext = () => {
    return useContext(ConfigurationContext);
};

export default function ConfigurationProvider({ children }: { children: React.ReactNode }) {
    return (
            <ConfigurationContext.Provider value={{ ...defaultContext }}>
            {children}
            </ConfigurationContext.Provider>    
    );
}
