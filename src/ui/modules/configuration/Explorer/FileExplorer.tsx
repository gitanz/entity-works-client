import { Button, createListCollection, Field, HStack, Input, Listbox, Menu, Portal, Span, VStack } from "@chakra-ui/react";
import { LuNetwork, LuPackage, LuPlus } from "react-icons/lu";
import { useShellContext } from "../../../shell/ShellContext";
import { useEffect, useRef, useState } from "react";
import type { KeyValue, Nullable } from "../../../types";
import type { IconType } from "react-icons";


type Files = File[];

interface File {
    name: string,
    path: string
}

interface FileField {
    value: any,
    error: boolean,
    errorMessage: string
}

interface RenameFileField extends FileField {
    rename: boolean,
    fileName: string
} 

interface FileApi {
    add: (params: {workspacePath: string, fileName: string}) => Promise<void>,
    rename: (params: {workspacePath: string, fileName: string, newFileName: string}) => Promise<void>,
    index: (params: {workspacePath: string}) => Promise<File[]>,
    delete: (params: {workspacePath: string, fileName: string}) => Promise<void>
}

interface ExplorerType {
    resource: {api: FileApi, label: string, icon: IconType},
    entity: {api: FileApi, label: string, icon: IconType}
}

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
    const resetFiles = () => setFiles(initialFiles);

    const initialAllowAddFile: boolean = false;
    const [allowAddFile, setAllowAddFile] = useState<boolean>(initialAllowAddFile);
    const showAddFileControl = () => setAllowAddFile(true);
    const hideAddFileControl = () => setAllowAddFile(false);
    const resetAllowAddFile = () => setAllowAddFile(initialAllowAddFile);

    const initialAddFileField: FileField = {
        value: '',
        error: false,
        errorMessage: ''
    };
    const [fileField, setFileField] = useState<FileField>(initialAddFileField);
    const resetFileField = () => setFileField(initialAddFileField);

    const initialRenameFileField: RenameFileField = {
        rename: false,
        fileName: '',
        value: '',
        error: false,
        errorMessage: ''
    };
    const [renameFileField, setRenameFileField] = useState<RenameFileField>(initialRenameFileField);
    const resetRenameFileField = () => setRenameFileField(initialRenameFileField);
    const showRenameFileField = (fileName: string) => {
        setRenameFileField(
            {
                rename: true,
                fileName: fileName,
                value: fileName,
                error: false,
                errorMessage: ''
            }
        );
    }

    const fileInputRef = useRef<Nullable<HTMLInputElement>>(null);
    const fileFormRef = useRef<Nullable<HTMLFormElement>>(null);
    const fileRenameRefs = useRef<KeyValue<HTMLInputElement|null>>({});

    const onLoad = (loader: () => void) => {
        useEffect(() => {
            loader();
        }, []);    
    }

    const onAllowAddFileChange = (effectFunction: () => void) => {
        useEffect(() => {
                effectFunction();
        }, [allowAddFile]);
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

    onAllowAddFileChange(() => {
        if (allowAddFile) {
            fileInputRef?.current?.focus()
        }
    })
    
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

    const addFileRequest = async() => {
        if (!workspacePath) {
            return;
        }
     
        const fileName = fileField.value;

        if (fileName && validateFileField(fileName, setFileField)) {
            await config.api.add({
                workspacePath,
                fileName
            });

            await loadFiles();
        }
        
        resetFileField();
        resetAllowAddFile();
    }

    const submitAddFileRequest = () => {
        fileFormRef?.current?.requestSubmit();
    }

    useEffect(() => {
            if (renameFileField.rename && renameFileField.fileName) {
                fileRenameRefs.current[renameFileField.fileName]?.focus();
            }
        }, 
        [renameFileField.rename, renameFileField.fileName]
    )

    const deleteFileHandler = (fileName: string) => {

    }
    
    const renameFile = async (newFileName: string, fileName: string) => {
        
        if (!workspacePath) {
            return;
        }

        if (!renameFileField.rename) {
            return;
        }

        if (!newFileName) {
            setRenameFileField(prev => ({
                ...prev,
                value: newFileName,
                error: true,
                errorMessage: 'Filename cannot be empty'
            }));

            return;
        }

        if (validateFileField(newFileName, setRenameFileField, fileName)) {
            resetRenameFileField();
            
            await config.api.rename({
                workspacePath,
                fileName: fileName,
                newFileName: newFileName
            });

            await loadFiles();
        }
    }

    //presentation
    return (
        <Listbox.Root
            collection={fileList}
            selectionMode="multiple"
        >
            <Listbox.Content>
                <form onSubmit={(e) => {e.preventDefault(); addFileRequest();}} ref={fileFormRef}>
                    <Field.Root hidden={allowAddFile}>
                        <VStack paddingX="var(--listbox-item-padding-x)" paddingY="var(--listbox-item-padding-y)" width={"full"}>
                            <Button 
                                size={"xs"} 
                                width={"full"} 
                                variant={"outline"} 
                                onClick={showAddFileControl}>
                                    <LuPlus></LuPlus><Span textTransform={'capitalize'}>Add {config.label}</Span>
                            </Button>
                        </VStack>
                    </Field.Root>
                    
                    <Field.Root invalid={fileField.error} hidden={!allowAddFile}>
                        <VStack paddingX="var(--listbox-item-padding-x)" paddingY="var(--listbox-item-padding-y)" width={"full"}>
                            <HStack width={"full"}>
                                <LuNetwork></LuNetwork>
                                <Input 
                                    type="text" 
                                    size={"xs"} 
                                    ref={fileInputRef} 
                                    value={fileField.value} 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            submitAddFileRequest();
                                        }

                                        if (e.key === 'Escape') {
                                            resetFileField();
                                            hideAddFileControl();
                                        }
                                    }}
                                    onBlur={
                                        (e) => submitAddFileRequest()
                                    } 
                                    onChange={
                                        (e) => validateFileField(e.target.value, setFileField)
                                    } 
                                    width={"full"}/>
                            </HStack>
                            
                            <Field.ErrorText hidden={!fileField.error }>{fileField.errorMessage}</Field.ErrorText>
                        </VStack>    
                    </Field.Root>
                </form>
                
                {fileList.items.map((file) => (
                    <div key={file.path}>
                        <Field.Root invalid={renameFileField.error} hidden={!renameFileField.rename || renameFileField.fileName !== file.name}>
                            <VStack paddingX="var(--listbox-item-padding-x)" paddingY="var(--listbox-item-padding-y)" width={"full"}>
                                <HStack width={"full"}>
                                    <LuNetwork></LuNetwork>
                                    <Input 
                                        type="text" 
                                        size={"xs"} 
                                        width={"full"}
                                        value={renameFileField.value} 
                                        ref={(el) => {fileRenameRefs.current[file.name] = el}} 
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                renameFile(e.target.value, file.name)
                                            }

                                            if (e.key === 'Escape') {
                                                resetRenameFileField()
                                            }
                                        }}
                                        onBlur={(e) => renameFile(e.target.value, file.name)} 
                                        onChange={(e) => validateFileField(e.target.value, setRenameFileField, file.name)} 
                                        />
                                </HStack>
                                
                                <Field.ErrorText hidden={!renameFileField.error }>{renameFileField.errorMessage}</Field.ErrorText>
                            </VStack>
                        </Field.Root>

                        <Menu.Root>
                            <Menu.ContextTrigger width="full">
                                <Listbox.Item item={file.path}>
                                    <HStack>
                                        <config.icon></config.icon>
                                        <Listbox.ItemText>{file.name}</Listbox.ItemText>
                                        <Listbox.ItemIndicator />

                                    </HStack>
                                </Listbox.Item>                
                            </Menu.ContextTrigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content >
                                        <Menu.Item value="rename" onClick={() => showRenameFileField(file.name)}>Rename</Menu.Item>
                                        <Menu.Item value="delete" onClick={() => deleteFileHandler(file.name)}>Delete</Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </div>
                ))}
            </Listbox.Content>
        </Listbox.Root>
    );
}