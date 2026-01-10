import { CompartmentBox } from "../../components/ui/compartment-box";
import { Splitter } from "@chakra-ui/react";
import Module from "../module";
import { FileExplorer } from "./Explorer/FileExplorer";
import { useModuleContext } from "../ModuleContext";
import { useEffect } from "react";
import DBPalette from "./DBPalette/DBPalette.tsx";

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
            <Module.Palette>
                <CompartmentBox.Box name="Palette">
                    <CompartmentBox.Compartment name="Datasource">
                        <DBPalette></DBPalette>
                    </CompartmentBox.Compartment>
                </CompartmentBox.Box>
            </Module.Palette>
        </Module.Root>      
    );
}

