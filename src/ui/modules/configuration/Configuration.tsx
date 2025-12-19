import { CompartmentBox } from "../../components/ui/compartment-box";
import { createTreeCollection, Tabs, TreeView } from "@chakra-ui/react";
import { LuChevronRight, LuFile, LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import Module from "../module";

export default function Configuration() {
    interface Node {
        id: string
        name: string
        children?: Node[]
    }

    const collection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
        id: "ROOT",
        name: "",
        children: [
        {
            id: "node_modules",
            name: "node_modules",
            children: [
            { id: "node_modules/zag-js", name: "zag-js" },
            { id: "node_modules/pandacss", name: "panda" },
            {
                id: "node_modules/@types",
                name: "@types",
                children: [
                { id: "node_modules/@types/react", name: "react" },
                { id: "node_modules/@types/react-dom", name: "react-dom" },
                ],
            },
            ],
        },
        {
            id: "src",
            name: "src",
            children: [
            { id: "src/app.tsx", name: "app.tsx" },
            { id: "src/index.ts", name: "index.ts" },
            ],
        },
        { id: "panda.config", name: "panda.config.ts" },
        { id: "package.json", name: "package.json" },
        { id: "renovate.json", name: "renovate.json" },
        { id: "readme.md", name: "README.md" },
        ],
    },
    });

    return (
        <Module.Root>
            <Module.Explorer>
                <CompartmentBox.Box name="Explorer">
                    <CompartmentBox.Compartment name="Resources">
                        <TreeView.Root collection={collection} maxW="sm" variant={'subtle'}>
                            <TreeView.Tree>
                                <TreeView.Node
                                indentGuide={<TreeView.BranchIndentGuide />}
                                render={({ node, nodeState }) =>
                                    nodeState.isBranch ? (
                                    <TreeView.BranchControl>
                                        <TreeView.BranchIndicator>
                                            <LuChevronRight />
                                        </TreeView.BranchIndicator>
                                        <TreeView.BranchText>{node.name}</TreeView.BranchText>
                                    </TreeView.BranchControl>
                                    ) : (
                                    <TreeView.Item>
                                        <LuFile />
                                        <TreeView.ItemText>{node.name}</TreeView.ItemText>
                                    </TreeView.Item>
                                    )
                                }
                                />
                            </TreeView.Tree>
                        </TreeView.Root>

                    </CompartmentBox.Compartment>
                    <CompartmentBox.Compartment name="Entities">
                        <TreeView.Root collection={collection} maxW="sm">
                            <TreeView.Tree>
                                <TreeView.Node
                                indentGuide={<TreeView.BranchIndentGuide />}
                                render={({ node, nodeState }) =>
                                    nodeState.isBranch ? (
                                    <TreeView.BranchControl>
                                        <LuFolder />
                                        <TreeView.BranchText>{node.name}</TreeView.BranchText>
                                    </TreeView.BranchControl>
                                    ) : (
                                    <TreeView.Item>
                                        <LuFile />
                                        <TreeView.ItemText>{node.name}</TreeView.ItemText>
                                    </TreeView.Item>
                                    )
                                }
                                />
                            </TreeView.Tree>
                        </TreeView.Root>
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
                        <TreeView.Root collection={collection} maxW="sm">
                            <TreeView.Tree>
                                <TreeView.Node
                                indentGuide={<TreeView.BranchIndentGuide />}
                                render={({ node, nodeState }) =>
                                    nodeState.isBranch ? (
                                    <TreeView.BranchControl>
                                        <LuFolder />
                                        <TreeView.BranchText>{node.name}</TreeView.BranchText>
                                    </TreeView.BranchControl>
                                    ) : (
                                    <TreeView.Item>
                                        <LuFile />
                                        <TreeView.ItemText>{node.name}</TreeView.ItemText>
                                    </TreeView.Item>
                                    )
                                }
                                />
                            </TreeView.Tree>
                        </TreeView.Root>
                    </CompartmentBox.Compartment>
                </CompartmentBox.Box>
            </Module.Palette>
        </Module.Root>      
    );
}
