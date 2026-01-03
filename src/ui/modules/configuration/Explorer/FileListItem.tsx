import { Button, CloseButton, Dialog, Field, HStack, Input, Listbox, Menu, Portal, VStack } from "@chakra-ui/react"
import { LuNetwork } from "react-icons/lu"
import { useShellContext } from "../../../shell/ShellContext";
import type { ExplorerConfiguration, File, RenameFileField } from "./types";
import { useEffect, useRef, useState } from "react";

export function FileListItem(
    {config, file, loadFiles, validateFileField, confirmDeleteFile}: 
    { 
        config: ExplorerConfiguration, 
        file: File, 
        loadFiles: () => Promise<void>, 
        validateFileField: <T extends RenameFileField>(value: string, setState: React.Dispatch<React.SetStateAction<T>>, fileName?: string) => boolean, 
        confirmDeleteFile: (fileName: string) => void
    }) {

    const { workspacePath } = useShellContext();
    const initialRenameFileField: RenameFileField = {
            rename: false,
            fileName: '',
            value: '',
            error: false,
            errorMessage: ''
        };

    const [renameFileField, setRenameFileField] = useState<RenameFileField>(initialRenameFileField);
    const resetRenameFileField = () => setRenameFileField(initialRenameFileField);
    const renameFileHandler = (fileName: string) => {
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
    
    const fileRenameRefs = useRef<Record<string, HTMLInputElement|null>>({});
    useEffect(() => {
            if (renameFileField.rename && renameFileField.fileName) {
                fileRenameRefs.current[renameFileField.fileName]?.focus();
            }
        }, 
        [renameFileField.rename, renameFileField.fileName]
    )
    
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

    return <>
        <Field.Root invalid={renameFileField.error} hidden={!renameFileField.rename || renameFileField.fileName !== file.name}>
            <VStack paddingX="var(--listbox-item-padding-x)" paddingY="var(--listbox-item-padding-y)" width={"full"}>
                <HStack width={"full"}>
                    <config.icon></config.icon>
                    <Input
                        type="text"
                        size={"xs"}
                        width={"full"}
                        value={renameFileField.value}
                        ref={(el) => { fileRenameRefs.current[file.name] = el }}
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

                <Field.ErrorText hidden={!renameFileField.error}>{renameFileField.errorMessage}</Field.ErrorText>
            </VStack>
        </Field.Root>

        <Menu.Root>
            <Menu.ContextTrigger width="full" hidden={renameFileField.rename && renameFileField.fileName === file.name}>
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
                        <Menu.Item value="rename" onClick={() => renameFileHandler(file.name)}>Rename</Menu.Item>
                        <Menu.Item value="delete" onClick={() => confirmDeleteFile(file.name)}>Delete</Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    </>
}