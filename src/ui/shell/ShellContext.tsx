import { createContext, useContext, useState } from "react";
import type { Nullable, ShellState } from "../types";

const defaultContext: ShellState = {
    layout: 'default',
    workspacePath: null,
    activatedModuleId: 'welcome',
}

export const ShellContext = createContext<ShellState>(defaultContext);

export const useShellContext = () => {
    return useContext(ShellContext);
}

export default function ShellProvider({children, layout, workspacePath, activatedModuleId}: {children?: React.ReactNode, layout: string, workspacePath?: string, activatedModuleId: string}) {
    const [layoutState, setLayoutState] = useState<string>(layout);
    const [workspacePathState, setWorkspacePathState] = useState<Nullable<string>>(workspacePath || null);
    const [activatedModuleIdState, setActivatedModuleState] = useState<string>(activatedModuleId);
    
    const context = {
        ...defaultContext,
        layout: layoutState,
        setLayout: setLayoutState,
        workspacePath: workspacePathState,
        setWorkspacePath: setWorkspacePathState,
        activatedModuleId: activatedModuleIdState,
        setActivatedModuleId: setActivatedModuleState,
    }

    return (
        <>
            <ShellContext.Provider value={context}>
                {children}
            </ShellContext.Provider>
        </>
    )
}
