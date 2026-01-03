import { useEffect, useRef, useState } from "react";
import type { Nullable } from "../../../types";
import type { ExplorerConfiguration, FileField } from "./types";
import { useShellContext } from "../../../shell/ShellContext";
import { Button, Field, HStack, Input, Span, VStack } from "@chakra-ui/react";
import { LuNetwork, LuPlus } from "react-icons/lu";

export function AddFileListItem({ config, loadFiles, validateFileField }: {
    config: ExplorerConfiguration,
    loadFiles: () => Promise<void>,
    validateFileField: (fileName: string, setState: React.Dispatch<React.SetStateAction<FileField>>) => boolean
}
) {
    const { workspacePath } = useShellContext();

    const fileInputRef = useRef<Nullable<HTMLInputElement>>(null);
    const fileFormRef = useRef<Nullable<HTMLFormElement>>(null);

    const initialShowAddFileField: boolean = false;
    const [showAddFileField, setShowAddFileField] = useState<boolean>(initialShowAddFileField);

    useEffect(() => {
        if (showAddFileField) {
            fileInputRef?.current?.focus()
        }
    }, [showAddFileField]);

    const addFileFieldControl = {
        show: () => setShowAddFileField(true),
        hide: () => setShowAddFileField(false),
        reset: () => setShowAddFileField(initialShowAddFileField)
    }
    
    const initialAddFileField: FileField = {
        value: '',
        error: false,
        errorMessage: ''
    };

    const [fileField, setFileField] = useState<FileField>(initialAddFileField);
    const resetFileField = () => setFileField(initialAddFileField);

    const addFileRequest = async () => {
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
        addFileFieldControl.reset();
    }

    const submitAddFileRequest = () => {
        fileFormRef?.current?.requestSubmit();
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); addFileRequest(); }} ref={fileFormRef}>
            <Field.Root hidden={showAddFileField}>
                <VStack paddingX="1" paddingY="1" width={"full"}>
                    <Button
                        size={"xs"}
                        width={"full"}
                        variant={"outline"}
                        onClick={addFileFieldControl.show}>
                        <LuPlus></LuPlus><Span textTransform={'capitalize'}>Add {config.label}</Span>
                    </Button>
                </VStack>
            </Field.Root>

            <Field.Root invalid={fileField.error} hidden={!showAddFileField}>
                <VStack paddingX="1" paddingY="1" width={"full"}>
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
                                    addFileFieldControl.hide();
                                }
                            }}
                            onBlur={
                                (e) => submitAddFileRequest()
                            }
                            onChange={
                                (e) => validateFileField(e.target.value, setFileField)
                            }
                            width={"full"} />
                    </HStack>

                    <Field.ErrorText hidden={!fileField.error}>{fileField.errorMessage}</Field.ErrorText>
                </VStack>
            </Field.Root>
        </form>
    )
}
