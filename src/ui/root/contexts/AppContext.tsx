import { createContext, useContext, useState } from "react";
import type { Nullable } from "../../../Types";

export interface IAppContext {
    id?: Nullable<string>,
    appLayout?: IAppLayoutContext
}

export interface IAppLayoutContext {
    explorer: Nullable<Number>,
    setExplorer: (value: Number) => void,
    palette: Nullable<Number>,
    setPalette: (value: Number) => void,
    drawer: Nullable<Number>,
    setDrawer: (value: Number) => void,
}

export const AppContext = createContext<IAppContext>({});

export const useAppContext = () => {
    return useContext(AppContext);
}

export default function AppProvider({id, children}: {id: string, children?: React.ReactNode}) {
    const [explorer, setExplorer] = useState<Number>(1)
    const [palette, setPalette] = useState<Number>(1)
    const [drawer, setDrawer] = useState<Number>(1)

    const defaultContext: IAppContext = {
        id: id,
        appLayout: {
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
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}