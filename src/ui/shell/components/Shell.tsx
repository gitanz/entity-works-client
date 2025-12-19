import { Box, HStack } from "@chakra-ui/react"
import Titlebar from "../layouts/Titlebar"
import AppMenu from "../layouts/AppMenu";
import Statusbar from "../layouts/Statusbar";
import layouts from "./Layouts";
import { useShellContext } from "../ShellContext";
import modules from "../../modules";
import ModuleProvider from "../../modules/ModuleContext";

export default function Root() {
    const {layout, activatedModuleId} = useShellContext();
    const Layout = layouts[layout].container;
    const ActivatedModule = modules[activatedModuleId];

    return (
        <>
            <Layout>
                <Titlebar>
                </Titlebar>
                <AppMenu></AppMenu>
                <Box display="contents">
                    <ModuleProvider id={activatedModuleId}>
                        <ActivatedModule />    
                    </ModuleProvider>
                </Box>
                <Statusbar>OK</Statusbar>
            </Layout>
        </>
    )
}
