import { createContext, useContext, useState } from "react";
import type { IModuleState } from "../types";

export const ModuleContext = createContext<IModuleState>({});

export const useModuleContext = () => {
    return useContext(ModuleContext);
}

export default function ModuleProvider({id, children}: {id: string, children?: React.ReactNode}) {
    const [explorer, setExplorer] = useState<Number>(1)
    const [palette, setPalette] = useState<Number>(1)
    const [drawer, setDrawer] = useState<Number>(1)

    const defaultContext: IModuleState = {
        id: id,
        moduleLayout: {
            explorer: explorer,
            setExplorer: setExplorer,
            palette: palette,
            setPalette: setPalette,
            drawer: drawer,
            setDrawer: setDrawer,
        }
    }

    const context = {...defaultContext, id: id};
        
    return (
        <ModuleContext.Provider value={context}>{children}</ModuleContext.Provider>
    );
}
