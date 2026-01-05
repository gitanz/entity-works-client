import { CompartmentBox } from "../../components/ui/compartment-box";
import { Splitter, Tabs } from "@chakra-ui/react";
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
                    <Splitter.Root
                        panels={[{ id: "resources", minSize: 20 }, { id: "entities", minSize: 20 }]}
                        borderWidth="1px"
                        minH="60"
                        orientation="vertical"
                        borderX={0}
                    >
                        <Splitter.Panel id="resources">
                            <CompartmentBox.Compartment name="Resources" style={{borderBottom: '1px solid #222222'}}>
                                <FileExplorer type="resource"></FileExplorer>
                            </CompartmentBox.Compartment>
                        </Splitter.Panel>
                        <Splitter.ResizeTrigger id="resources:entities" />
                        <Splitter.Panel id="entities">
                            <CompartmentBox.Compartment name="Entities">
                                <FileExplorer type="entity"></FileExplorer>
                            </CompartmentBox.Compartment>
                        </Splitter.Panel>
                    </Splitter.Root>
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

