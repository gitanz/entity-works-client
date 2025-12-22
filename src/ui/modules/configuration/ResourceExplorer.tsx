import { Button, createListCollection, Field, HStack, Input, Listbox, Menu, Portal, Span, VStack } from "@chakra-ui/react";
import { LuNetwork, LuPlus } from "react-icons/lu";
import { useShellContext } from "../../shell/ShellContext";
import { useEffect, useRef, useState, type Dispatch } from "react";
import type { Nullable } from "../../types";


type Resources = ResourceFile[];

interface ResourceFile {
    name: string,
    path: string
}

interface ResourceNameField {
    value: any,
    error: boolean,
    errorMessage: string
}

interface RenameResourceField extends ResourceNameField {
    rename: boolean,
    resourceName: string
} 

export function ResourceExplorer() {
    //states and refs
    const {workspacePath} = useShellContext();
    const [resources, setResources] = useState<Resources>([]);
    const [allowAddResource, setAllowAddResource] = useState<boolean>(false);
    const [resourceNameField, setResourceNameField] = useState<ResourceNameField>({
        value: '',
        error: false,
        errorMessage: ''
    });

    const [renameResourceField, setRenameResourceField] = useState<RenameResourceField>({
        rename: false,
        resourceName: '',
        value: '',
        error: false,
        errorMessage: ''
    });

    const resourceInputRef = useRef<Nullable<HTMLInputElement>>(null);
    const resourceFormRef = useRef<Nullable<HTMLFormElement>>(null);
    
    useEffect(() => {
        loadResources();
    }, []);

    useEffect(() => {
        if (allowAddResource) {
            resourceInputRef?.current?.focus()
        }
    }, [allowAddResource]);
    
    //data
    const loadResources = async () => {
        let resources = await window.electronApi.configuration.resources.index({
            workspacePath
        });

        resources = resources.map(resource => ({name: resource.name, path: resource.path} as ResourceFile));

        setResources(resources);
    };

    
    const resourcesList = createListCollection({
        items: resources,
    });

    //behaviors
    const handleAddResource = () => {
        setAllowAddResource(true);
        resourceInputRef?.current?.focus();
    }

    const validateResourceNameField = <T extends ResourceNameField> (value: string, setState: React.Dispatch<React.SetStateAction<T>>, resourceName: string='') => {
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
                errorMessage: 'Invalid resource name. Resource name can only contain alphanumber characters.'
            }));

            return false;
        }

        const duplicate = resources
            .filter(resource => !resourceName || resource.name.toLowerCase() !== resourceName.toLowerCase())
            .find(resource => resource.name === value);

        if (duplicate) {
            setState(prev => ({
                ...prev,
                value: value,
                error: true,
                errorMessage: 'Resource name already exist.'
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

    const addResource = async() => {     
        const resourceName = resourceNameField.value;

        if (resourceName && validateResourceNameField(resourceName)) {
            await window.electronApi.configuration.resources.add({
                workspacePath,
                resourceName
            });

            await loadResources();
        }
        
        setResourceNameField({
            value: '',
            error: false,
            errorMessage: ''
        });

        setAllowAddResource(false);
    }

    const triggerFormSubmit = () => {
        resourceFormRef?.current?.requestSubmit();
    }

    const renameResourceHandler = (resourceName: string) => {
        setRenameResourceField(prev => ({
            ...prev,
            rename: true,
            resourceName: resourceName,
            value: resourceName
        }));
    }

    const renameResource = async (newResourceName: string, resourceName: string) => {
        if (!newResourceName) {
            setRenameResourceField(prev => ({
                ...prev,
                rename: true,
                resourceName: resourceName,
                value: newResourceName,
                error: true,
                errorMessage: 'Resource name cannot be empty'
            }));

            return;
        }

        if (validateResourceNameField(newResourceName, setRenameResourceField, resourceName)) {
            setRenameResourceField(prev => ({
                ...prev,
                rename: false,
                resourceName: '',
                value: '',
                error: false,
                errorMessage: ''
            }));

            await window.electronApi.configuration.resources.rename({
                workspacePath,
                resourceName,
                newResourceName
            });

            await loadResources();
        }
    }

    //presentation
    return (
        <Listbox.Root
            collection={resourcesList}
        >
            <Listbox.Content>
                <form onSubmit={(e) => {e.preventDefault(); addResource();}} ref={resourceFormRef}>
                    <Field.Root hidden={allowAddResource}>
                        <VStack paddingX="var(--listbox-item-padding-x)" paddingY="var(--listbox-item-padding-y)" width={"full"}>
                            <Button size={"xs"} width={"full"} variant={"outline"} onClick={handleAddResource}><LuPlus></LuPlus><Span>Add Resource</Span></Button>
                        </VStack>
                    </Field.Root>
                    
                    <Field.Root invalid={resourceNameField.error} hidden={!allowAddResource}>
                        <VStack paddingX="var(--listbox-item-padding-x)" paddingY="var(--listbox-item-padding-y)" width={"full"}>
                            <HStack width={"full"}>
                                <LuNetwork></LuNetwork>
                                <Input type="text" size={"xs"} ref={resourceInputRef} onBlur={triggerFormSubmit} value={resourceNameField.value} onChange={(e) => validateResourceNameField(e.target.value, setResourceNameField)} width={"full"}/>
                            </HStack>
                            
                            <Field.ErrorText hidden={!resourceNameField.error }>{resourceNameField.errorMessage}</Field.ErrorText>
                        </VStack>    
                    </Field.Root>
                </form>
                
                {resourcesList.items.map((resource) => (
                    <div>
                        <Field.Root invalid={renameResourceField.error} hidden={!renameResourceField.rename || renameResourceField.resourceName !== resource.name}>
                            <VStack paddingX="var(--listbox-item-padding-x)" paddingY="var(--listbox-item-padding-y)" width={"full"}>
                                <HStack width={"full"}>
                                    <LuNetwork></LuNetwork>
                                    <Input type="text" size={"xs"} value={renameResourceField.value} onBlur={(e) => renameResource(e.target.value, resource.name)} onChange={(e) => validateResourceNameField(e.target.value, setRenameResourceField, resource.name)} width={"full"}/>
                                </HStack>
                                
                                <Field.ErrorText hidden={!renameResourceField.error }>{renameResourceField.errorMessage}</Field.ErrorText>
                            </VStack>
                        </Field.Root>

                        <Menu.Root>
                            <Menu.ContextTrigger width="full">
                                <Listbox.Item item={resource} key={resource.path}>
                                    <HStack>
                                        <LuNetwork></LuNetwork>
                                        <Listbox.ItemText>{resource.name}</Listbox.ItemText>
                                    </HStack>
                                </Listbox.Item>                
                            </Menu.ContextTrigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content >
                                        <Menu.Item value="rename" onClick={() => renameResourceHandler(resource.name)}>Rename</Menu.Item>
                                        <Menu.Item value="delete">Delete</Menu.Item>
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