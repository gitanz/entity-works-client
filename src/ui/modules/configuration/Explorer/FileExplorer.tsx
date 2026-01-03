import { createListCollection, Listbox } from "@chakra-ui/react";
import { LuNetwork, LuPackage } from "react-icons/lu";
import { useShellContext } from "../../../shell/ShellContext";
import { useEffect, useState } from "react";
import type { ExplorerType, FileField, Files } from "./types";
import { AddFileListItem } from "./AddFileListItem";
import { FileListItem } from "./FileListItem";


const explorerConfiguration: ExplorerType = {
    resource: {
        api: window.electronApi.configuration.resources,
        label: 'Resources',
        icon: LuNetwork
    },

    entity: {
        api: window.electronApi.configuration.entities,
        label: 'Entities',
        icon: LuPackage
    }
};

export function FileExplorer({type}: {type: keyof ExplorerType}) {
    const config = explorerConfiguration[type];

    //states and refs
    const {workspacePath} = useShellContext();
    const initialFiles: Files = [];
    const [files, setFiles] = useState<Files>(initialFiles);

    const onLoad = (loader: () => void) => {
        useEffect(() => {
            loader();
        }, []);    
    }

    const loadFiles = async () => {
        if (!workspacePath) {
            return;
        }

        let files = await config.api.index({
            workspacePath
        });

        setFiles(files);
    };


    onLoad(() => {
        loadFiles();
    });

    const fileList = createListCollection({
        items: files,
    });

    //behaviors

    const validateFileField = <T extends FileField> (value: string, setState: React.Dispatch<React.SetStateAction<T>>, fileName: string='') => {
        const regex = /^[a-zA-Z0-9-_]+$/;
        const regexPass = regex.test(value);

        if (!value) {
            setState(prev => ({
                ...prev,
                value: value,
                error: false,
                errorMessage: ''
            }));

            return false;
        }

        if (!regexPass) {
            setState(prev => ({
                ...prev,
                value: value,
                error: true,
                errorMessage: 'Invalid file name. File name can only contain alphanumber characters.'
            }));

            return false;
        }

        const duplicate = files
            .filter(file => !fileName || file.name.toLowerCase() !== fileName.toLowerCase())
            .find(file => file.name === value);

        if (duplicate) {
            setState(prev => ({
                ...prev,
                value: value,
                error: true,
                errorMessage: 'File name already exist.'
            }));

            return false;
        }

        setState(prev => ({
            ...prev,
            value: value,
            error: false,
            errorMessage: ''
        }));

        return true;
    }

    //presentation
    return (
        <>
            <AddFileListItem config={config} loadFiles={loadFiles} validateFileField={validateFileField}></AddFileListItem>
            <Listbox.Root
                collection={fileList}
                selectionMode="multiple"
            >
                <Listbox.Content>
                    
                    {fileList.items.map((file) => (
                        <FileListItem
                            config={config}
                            file={file}
                            loadFiles={loadFiles}
                            validateFileField={validateFileField}
                        />
                    ))}

                </Listbox.Content>
            </Listbox.Root>
        </>
        
    );
}