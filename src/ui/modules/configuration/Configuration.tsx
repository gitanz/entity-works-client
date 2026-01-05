import { CompartmentBox } from "../../components/ui/compartment-box";
import { Separator, Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import Module from "../module";
import { FileExplorer } from "./Explorer/FileExplorer";
import { useModuleContext } from "../ModuleContext";
import { useEffect } from "react";

export default function Configuration() {
    
    const {moduleLayout} = useModuleContext();

    useEffect(() => {
        moduleLayout?.setExplorer(1);
        moduleLayout?.setDrawer(0);
        moduleLayout?.setPalette(1);
    }, []);
    
    return (
        <Module.Root>
            <Module.Explorer>
                <CompartmentBox.Box name="Explorer">
                    <CompartmentBox.Compartment name="Resources">
                        <FileExplorer type="resource"></FileExplorer>
                    </CompartmentBox.Compartment>    
                    <Separator></Separator>
                    <CompartmentBox.Compartment name="Entities">
                        <FileExplorer type="entity"></FileExplorer>
                        </CompartmentBox.Compartment>
                    </CompartmentBox.Box>
            </Module.Explorer>
            <Module.Workspace>
                <div>
                    this is workspace
                </div>
            </Module.Workspace>
            <Module.Drawer>
                <Tabs.Root defaultValue="members">
                    <Tabs.List>
                        <Tabs.Trigger value="members">
                        <LuUser />
                        Members
                        </Tabs.Trigger>
                        <Tabs.Trigger value="projects">
                        <LuFolder />
                        Projects
                        </Tabs.Trigger>
                        <Tabs.Trigger value="tasks">
                        <LuSquareCheck />
                        Settings
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="members">Manage your team members</Tabs.Content>
                    <Tabs.Content value="projects">Manage your projects</Tabs.Content>
                    <Tabs.Content value="tasks">
                        Manage your tasks for freelancers
                    </Tabs.Content>
                    </Tabs.Root>
            </Module.Drawer>
            <Module.Palette>
                <CompartmentBox.Box name="Palette">
                    <CompartmentBox.Compartment name="Schema">
                    </CompartmentBox.Compartment>
                </CompartmentBox.Box>
            </Module.Palette>
        </Module.Root>      
    );
}

