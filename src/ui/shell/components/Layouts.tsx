import { Grid } from "@chakra-ui/react";
import type { LayoutSpecs } from "../../types";

const defaultLayoutSpecs: LayoutSpecs = {
    menuBarWidth: 50,
    titleBarHeight: 35,
    statusBarHeight: 25
}

function DefaultLayout({children}: {children?: React.ReactNode}) {
    
    return (
        <Grid 
            templateColumns={`${defaultLayoutSpecs.menuBarWidth}px calc(100vw - ${defaultLayoutSpecs.menuBarWidth}px)`} 
            templateRows={`${defaultLayoutSpecs.titleBarHeight}px calc(100vh - ${defaultLayoutSpecs.titleBarHeight}px - ${defaultLayoutSpecs.statusBarHeight}px) ${defaultLayoutSpecs.statusBarHeight}px`}
            templateAreas={
                `
                    "titlebar titlebar"
                    "app-menu app-area"
                    "statusbar statusbar"
                `                  
            }
            borderWidth="1px"
            borderColor="border"
        >    
            {children}
        </Grid>
    )
}

const layouts: {[key: string]: {container: React.ComponentType, specs: LayoutSpecs}} = {
    "default": {
        container: DefaultLayout,
        specs: defaultLayoutSpecs
    },
}

export default layouts;