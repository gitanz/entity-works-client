import { CompartmentBox } from "../../components/ui/compartment-box";
import { createListCollection, HStack, Listbox, Stack, Tabs } from "@chakra-ui/react";
import { LuFolder, LuNetwork, LuPlus, LuSquareCheck, LuUser } from "react-icons/lu";
import Module from "../module";
import { useEffect, useState } from "react";
import { useShellContext } from "../../shell/ShellContext";

export default function Configuration() {

    type ResourceFile = {
        name: string;
        path: string;
    }

    type Resources = ResourceFile[];

    const [resources, setResources] = useState<Resources>([]);

    const { workspacePath } = useShellContext();
    
    const loadResources = async () => {
        const resoourcesIndex = await window.electronApi.configuration.resources.index({
            workspacePath
        });
        setResources(resoourcesIndex);
    };

    useEffect(() => {
        loadResources();
    }, []);

    const resourcesList = createListCollection({
        items: resources.map(resource => ({ label: resource, value: resource })),
    });

    const [value, setValue] = useState<string[]>([])

    return (
        <Module.Root>
            <Module.Explorer>
                <CompartmentBox.Box name="Explorer">
                    <CompartmentBox.Compartment name="Resources">
                        <Stack maxWidth="320px" width="full" gap="4">
                            <Listbox.Root
                                collection={resourcesList}
                                value={value}
                                onValueChange={(details) => setValue(details.value)}
                            >
                                <Listbox.Content>
                                    <Listbox.Item item={[{ label: "React.js", value: "react" }]} key="react">
                                        <HStack>
                                            <LuPlus></LuPlus>
                                            <Listbox.ItemText>Add Resource</Listbox.ItemText>
                                        </HStack>
                                        
                                    </Listbox.Item>
                                    {resourcesList.items.map((resource) => (
                                        <Listbox.Item item={resource} key={resource.value}>
                                            <HStack>
                                                <LuNetwork></LuNetwork>
                                                <Listbox.ItemText>{resource.label}</Listbox.ItemText>
                                            </HStack>
                                        </Listbox.Item>
                                    ))}
                                </Listbox.Content>
                            </Listbox.Root>
                        </Stack>
                    </CompartmentBox.Compartment>
                    <CompartmentBox.Compartment name="Entities">
                        
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

