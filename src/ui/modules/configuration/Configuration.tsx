import { CompartmentBox } from "../../components/ui/compartment-box";
import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import Module from "../module";
import { FileExplorer } from "./Explorer/FileExplorer";

export default function Configuration() {
    return (
        <Module.Root>
            <Module.Explorer>
                <CompartmentBox.Box name="Explorer">
                    <CompartmentBox.Compartment name="Resources">
                        <FileExplorer type="resource"></FileExplorer>
                    </CompartmentBox.Compartment>
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

