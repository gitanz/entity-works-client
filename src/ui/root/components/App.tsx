import { Grid, GridItem } from "@chakra-ui/react";
import { LAYOUT } from "../constants/Layout";
import AppProvider, { useAppContext } from "../contexts/AppContext";

const AppRoot = ({children}: {children: React.ReactNode}) => {
    const context = useAppContext();
    const explorerColumnSpace = `clamp(250px, ${context.appLayout?.explorer}px, 500px)`;
    const paletteColumnSpace = `clamp(250px, ${context.appLayout?.palette}px, 500px)`;
    const workspaceColumnSpace = `calc(100vw - ${explorerColumnSpace} - ${paletteColumnSpace} - ${LAYOUT.menuBarWidth}px)`;

    const drawerRowSpace = `clamp(250px, ${context.appLayout?.drawer}px, 500px)`;
    const workspaceRowSpace = `calc(100vh - ${drawerRowSpace} - ${LAYOUT.titleBarHeight}px - ${LAYOUT.statusBarHeight}px)`;

    const appColumns = `${explorerColumnSpace} ${workspaceColumnSpace} ${paletteColumnSpace}`
    const appRows = `${workspaceRowSpace} ${drawerRowSpace}`

    const appAreas = `
        "${context.appLayout?.explorer ? 'explorer': 'workspace'} workspace ${context.appLayout?.palette ? 'palette': 'workspace'}"
        "${context.appLayout?.explorer ? 'explorer': ( context.appLayout?.drawer ? 'drawer': 'workspace')} ${context.appLayout?.drawer ? 'drawer': 'workspace'} ${context.appLayout?.palette ? 'palette': ( context.appLayout?.drawer ? 'drawer': 'workspace')}"
    `;

    return (
        <GridItem
            gridArea={"app-area"}>
                <Grid 
                    templateColumns={appColumns} 
                    templateRows={appRows}
                    templateAreas={appAreas}
                >
                    {children}    
                </Grid>      
        </GridItem>
    );
}

const AppExplorer = ({children}: {children?: React.ReactNode}) => {
    const {appLayout} = useAppContext();
    if (appLayout?.explorer === 0) return null;

    return (
        <GridItem 
            gridArea={"explorer"}
            borderRightWidth="1px"
            borderRightColor="border"
            borderBottomWidth="1px"
            borderBottomColor="border"
        >
            {children}
        </GridItem>
    );
}

const AppWorkspace = ({children}: {children?: React.ReactNode}) => {
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

const AppPalette = ({children}: {children?: React.ReactNode}) => {
    const {appLayout} = useAppContext();
    if (appLayout?.palette === 0) return null;

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

const AppDrawer = ({children}: {children?: React.ReactNode}) => {
    const {appLayout} = useAppContext();
    if (appLayout?.drawer === 0) return null;

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
    Provider: AppProvider,
    Root: AppRoot,
    Explorer: AppExplorer,
    Workspace: AppWorkspace,
    Palette: AppPalette,
    Drawer: AppDrawer,
}
