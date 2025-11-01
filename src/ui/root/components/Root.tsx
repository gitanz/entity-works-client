
import { Grid } from "@chakra-ui/react"
import Titlebar from "../layouts/Titlebar"
import AppMenu from "../layouts/AppMenu";
import Statusbar from "../layouts/Statusbar";
import { LAYOUT } from "../constants/Layout";
import ConfigurationContainer from "../../apps/configuration/containers/ConfigurationContainer";


export default function Root() {
    return (
        <>
            <Grid 
                templateColumns={`${LAYOUT.menuBarWidth}px calc(100vw - ${LAYOUT.menuBarWidth}px)`} 
                templateRows={`${LAYOUT.titleBarHeight}px calc(100vh - ${LAYOUT.titleBarHeight}px - ${LAYOUT.statusBarHeight}px) ${LAYOUT.statusBarHeight}px`}
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
                <Titlebar></Titlebar>
                <AppMenu></AppMenu>
                <div style={{ display: "contents" }}>
                    <ConfigurationContainer></ConfigurationContainer>
                </div>
                
                <Statusbar>OK</Statusbar>
            </Grid>
        </>
    )
}
