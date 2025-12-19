import { createContext, useContext, useState } from 'react';
import type { IWelcomeModuleState } from '../../types';

export const WelcomeContext = createContext<IWelcomeModuleState>({});

export const useWelcomeContext = () => {
    return useContext(WelcomeContext);
}

export default function WelcomeProvider({children}:{children: React.ReactNode}) {

    const [projectPath, setProjectPath] = useState('');

    const welcomeContext = {
        projectPath: projectPath,
        setProjectPath: setProjectPath
    };

    return (
        <WelcomeContext.Provider value={welcomeContext}> 
            {children}
        </WelcomeContext.Provider>
    )
}
