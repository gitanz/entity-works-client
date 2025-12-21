import { Button, createListCollection, Field, HStack, Input, Listbox, Menu, Portal, Span, VStack } from "@chakra-ui/react";
import { LuNetwork, LuPlus } from "react-icons/lu";
import { useShellContext } from "../../shell/ShellContext";
import { useEffect, useRef, useState } from "react";
import type { Nullable } from "../../types";

type ResourceFile = {
        name: string;
        path: string;
    }

type Resources = ResourceFile[];

type FormField = {
    value: any,
    error: boolean,
    errorMessage: string
}

export function ResourceExplorer() {
    //states and refs
    const {workspacePath} = useShellContext();
    const [resources, setResources] = useState<Resources>([]);
    const [allowAddResource, setAllowAddResource] = useState<boolean>(false);
    const [resourceNameField, setResourceNameField] = useState<FormField>({
        value: "",
        error: false,
        errorMessage: ""
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

    const validateResourceNameField = (name: string) => {
        const regex = /^[a-zA-Z0-9-_]+$/;
        const regexPass = regex.test(name);

        if (!name) {
            setResourceNameField({
                value: name,
                error: false,
                errorMessage: ''
            });

            return false;
        }

        if (!regexPass) {
            setResourceNameField({
                value: name,
                error: true,
                errorMessage: 'Invalid resource name. Resource name can only contain alphanumber characters.'
            });

            return false;
        }

        const duplicate = resources.find(resource => resource.name === name);
        if (duplicate) {
            setResourceNameField({
                value: name,
                error: true,
                errorMessage: 'Resource name already exist.'
            });

            return false;
        }

        setResourceNameField(
            {
                value: name,
                error: false,
                errorMessage: ''
            }
        );

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
                                <Input type="text" size={"xs"} ref={resourceInputRef} onBlur={triggerFormSubmit} value={resourceNameField.value} onChange={(e) => validateResourceNameField(e.target.value)} width={"full"}/>
                            </HStack>
                            
                            <Field.ErrorText hidden={!resourceNameField.error }>{resourceNameField.errorMessage}</Field.ErrorText>
                        </VStack>
                        
                    </Field.Root>
                </form>
                
                {resourcesList.items.map((resource) => (
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
                                <Menu.Item value="rename">Rename</Menu.Item>
                                <Menu.Item value="delete">Delete</Menu.Item>
                            </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>                           
                ))}

            </Listbox.Content>
        </Listbox.Root>
    );
}