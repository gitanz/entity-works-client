import { Grid, GridItem } from "@chakra-ui/react";
import { useShellContext } from "../shell/ShellContext";
import layouts from "../shell/components/Layouts";
import ModuleProvider, { useModuleContext } from "./ModuleContext";

const ModuleRoot = ({children}: {children: React.ReactNode}) => {
    const {layout} = useShellContext();
    const layoutSpecs = layouts[layout].specs;
    
    const moduleContext = useModuleContext();
    const explorerColumnSpace = `clamp(250px, ${moduleContext.moduleLayout?.explorer}px, 500px)`;
    const paletteColumnSpace = `clamp(250px, ${moduleContext.moduleLayout?.palette}px, 500px)`;
    const workspaceColumnSpace = `calc(100vw - ${explorerColumnSpace} - ${paletteColumnSpace} - ${layoutSpecs.menuBarWidth}px)`;

    const drawerRowSpace = `clamp(250px, ${moduleContext.moduleLayout?.drawer}px, 500px)`;
    const workspaceRowSpace = `calc(100vh - ${drawerRowSpace} - ${layoutSpecs.titleBarHeight}px - ${layoutSpecs.statusBarHeight}px)`;

    const appColumns = `${explorerColumnSpace} ${workspaceColumnSpace} ${paletteColumnSpace}`
    const appRows = `${workspaceRowSpace} ${drawerRowSpace}`

    const appAreas = `
        "${moduleContext.moduleLayout?.explorer ? 'explorer': 'workspace'} workspace ${moduleContext.moduleLayout?.palette ? 'palette': 'workspace'}"
        "${moduleContext.moduleLayout?.explorer ? 'explorer': ( moduleContext.moduleLayout?.drawer ? 'drawer': 'workspace')} ${moduleContext.moduleLayout?.drawer ? 'drawer': 'workspace'} ${moduleContext.moduleLayout?.palette ? 'palette': ( moduleContext.moduleLayout?.drawer ? 'drawer': 'workspace')}"
    `;

    return (
        <GridItem
            gridArea={"app-area"}
            height={'full'}
            overflowY={'hidden'}
            >
                <Grid 
                    templateColumns={appColumns} 
                    templateRows={appRows}
                    templateAreas={appAreas}
                    height={'full'}
                    overflowY={'hidden'}
                >
                    {children}    
                </Grid>      
        </GridItem>
    );
}  

const ModuleExplorer = ({children}: {children?: React.ReactNode}) => {
    const {moduleLayout} = useModuleContext();
    if (moduleLayout?.explorer === 0) return null;

    return (
            <GridItem 
            gridArea={"explorer"}
            borderRightWidth="1px"
            borderRightColor="border"
            borderBottomWidth="1px"
            borderBottomColor="border"
            height={'full'}
            overflowY='hidden'
            >
                {children}
            </GridItem>
    );
}

const ModuleWorkspace = ({children}: {children?: React.ReactNode}) => {
    return (
        <GridItem 
            gridArea={"workspace"}
            borderRightWidth="1px"
            borderRightColor="border"
            borderBottomWidth="1px"
            borderBottomColor="border"
        >
            {children}
        </GridItem>
    );
}

const ModulePalette = ({children}: {children?: React.ReactNode}) => {
    const {moduleLayout} = useModuleContext();
    if (moduleLayout?.palette === 0) return null;

    return (
        <GridItem 
            gridArea={"palette"}
            borderRightWidth="1px"
            borderRightColor="border"
            borderBottomWidth="1px"
            borderBottomColor="border"
        >
            {children}
        </GridItem>
    );
}

const ModuleDrawer = ({children}: {children?: React.ReactNode}) => {
    const {moduleLayout} = useModuleContext();
    if (moduleLayout?.drawer === 0) return null;

    return (
        <GridItem 
            gridArea={"drawer"}
            borderRightWidth="1px"
            borderRightColor="border"
            borderBottomWidth="1px"
            borderBottomColor="border"
        >
            {children}
        </GridItem>
    );
}

export default {
    Provider: ModuleProvider,
    Root: ModuleRoot,
    Explorer: ModuleExplorer,
    Workspace: ModuleWorkspace,
    Palette: ModulePalette,
    Drawer: ModuleDrawer,
}
