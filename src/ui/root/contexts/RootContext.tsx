import { createContext, useContext } from "react";
import { LAYOUT } from "../constants/Layout";

export interface IRootContext {
    layout?: string
}

const defaultContext: IRootContext = {
    layout: LAYOUT.defaultLayout
}

export const RootContext = createContext<IRootContext>(defaultContext);

export const useRootContext = () => {
    return useContext(RootContext);
}

export default function RootProvider({children, layout}: {children?: React.ReactNode, layout: string}) {
    return (
        <>
            <RootContext.Provider value={{...defaultContext, layout: layout}}>
                {children}
            </RootContext.Provider>
        </>
    )
}
