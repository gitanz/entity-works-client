import { Box, Button, CloseButton, createListCollection, Dialog, Portal, VStack } from "@chakra-ui/react";
import { LuNetwork, LuPackage } from "react-icons/lu";
import { useShellContext } from "../../../shell/ShellContext";
import { useEffect, useState } from "react";
import type { DeleteFileField, ExplorerType, FileField, Files } from "../types";
import { AddFileListItem } from "./AddFileListItem";
import { FileListItem } from "./FileListItem";
import type { Nullable } from "../../../types";


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

    const [deleteFileState, setDeleteFileState] = useState<Nullable<DeleteFileField>>(null);
    const confirmDeleteFile = (fileName: string) => {
        setDeleteFileState({
            delete: true,
            fileName: fileName
        });
    }

    const deleteFile = async (fileName: string) => {
        if (!workspacePath) {
            return;
        }
        
        if(!fileName) {
            return;
        }

        await config.api.delete({
            workspacePath,
            fileName: fileName
        });
    
        resetDeleteFile();
        
        await loadFiles();
    }

    const resetDeleteFile = () => {
        setDeleteFileState(null);
    }


    //presentation
    return (
        <VStack height={'full'}>
            <Box flexShrink={0} width={'full'}>
                <AddFileListItem config={config} loadFiles={loadFiles} validateFileField={validateFileField}></AddFileListItem>
            </Box>

            <Box flex={1} maxHeight={'full'} width={'full'} overflowY={'scroll'}>
                <VStack flex={'1'}>
                {fileList.items.map((file) => (
                    <FileListItem
                        config={config}
                        file={file}
                        loadFiles={loadFiles}
                        validateFileField={validateFileField}
                        confirmDeleteFile={confirmDeleteFile}
                        key={file.path}
                    />
                ))}    
            </VStack>        
            </Box>
            
            <Dialog.Root 
            role="alertdialog"
            open={deleteFileState?.delete}
            placement={'center'}
            >    
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                            <p>
                                This will delete the {type} <strong>{deleteFileState?.fileName}</strong>. 
                            </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline" onClick={resetDeleteFile}>Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button variant={'outline'} colorPalette="red" onClick={() => {
                                        if (!deleteFileState) return;
                                        deleteFile(deleteFileState.fileName)
                                    }
                                }>Delete</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild><CloseButton size="sm" onClick={resetDeleteFile}/></Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </VStack>
    );
}