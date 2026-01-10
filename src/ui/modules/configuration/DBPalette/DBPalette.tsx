import {useReducer, useState} from "react";
import {Box, Button, CloseButton, Dialog, Field, Input, Portal, Stack, VStack} from "@chakra-ui/react";
import {LuPlus} from "react-icons/lu";
import type { Nullable } from "../../../types";

type Datasource = {
    name: string;
    driver: string;
    host: string;
    port: number;
    username: string;
    password: string;
}

const initialDatasource: Datasource = {
    name: '',
    driver: '',
    host: '',
    port: 3306,
    username: '',
    password: ''
};

function datasourceReducer(state: Datasource, action: {type: string, payload: number|string}): Datasource {
    switch(action.type) {
        case 'set_name':
            return {
                ...state,
                name: action.payload as string
            };

        case 'set_driver':
            return {
                ...state,
                driver: action.payload as string
            };
        case 'set_host':
            return {
                ...state,
                host: action.payload as string
            };
        case 'set_port':
            return {
                ...state,
                port: action.payload as number
            };
        case 'set_username':
            return {
                ...state,
                username: action.payload as string
            }
        case 'set_password':
            return {
                ...state,
                password: action.payload as string
            };

        default:
            return state;
    }
}

export default function DBPalette ()  {
    const [datasource, dispatchDatasourceReducer] = useReducer(datasourceReducer, initialDatasource);
    const [activatedDatasource, setActivatedDatasource] = useState<Nullable<Datasource>>(null);

    async function testConnection(datasource: Datasource) {
        const result = await window.electronApi.configuration.DBPalette.testConnection(datasource);
        console.log('Connection test result:', result);
    }

    return (
        <VStack>
            <Box width={'full'} padding={2.5}>
                <Dialog.Root placement={'center'}>
                    <Dialog.Trigger asChild>
                        <Button variant='outline' width={'full'} size='sm'> <LuPlus></LuPlus> Manage </Button>
                    </Dialog.Trigger>

                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Add Datasources</Dialog.Title>
                                </Dialog.Header>

                                <Dialog.Body>
                                    <Stack gap={4}>
                                        <Field.Root required orientation={'horizontal'}>
                                            <Field.Label>
                                                Name <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                name={'connectionName'}
                                                id={'connectionName'}
                                                value={datasource.name}
                                                onChange={(e) => dispatchDatasourceReducer({type: 'set_name', payload: e.target.value})}
                                            />
                                        </Field.Root>
                                        <Field.Root required orientation={'horizontal'}>
                                            <Field.Label>
                                                Driver <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                name={'connectionDriver'}
                                                id={'connectionDriver'}
                                                value={datasource.driver}
                                                onChange={(e) => dispatchDatasourceReducer({type: 'set_driver', payload: e.target.value})}/>
                                        </Field.Root>
                                        <Field.Root required orientation={'horizontal'}>
                                            <Field.Label>
                                                Host <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                name={'connectionDriver'}
                                                id={'connectionDriver'}
                                                value={datasource.host}
                                                onChange={(e) => dispatchDatasourceReducer({type: 'set_host', payload: e.target.value})}/>
                                        </Field.Root>
                                        <Field.Root required orientation={'horizontal'}>
                                            <Field.Label>
                                                Port <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                name={'connectionDriver'}
                                                id={'connectionDriver'}
                                                value={datasource.port}
                                                onChange={(e) => dispatchDatasourceReducer({type: 'set_port', payload: e.target.value})}/>
                                        </Field.Root>
                                        <Field.Root required orientation={'horizontal'}>
                                            <Field.Label>
                                                Username <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                name={'connectionDriver'}
                                                id={'connectionDriver'}
                                                value={datasource.username}
                                                onChange={(e) => dispatchDatasourceReducer({type: 'set_username', payload: e.target.value})}/>
                                        </Field.Root>
                                        <Field.Root required orientation={'horizontal'}>
                                            <Field.Label>
                                                Password <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                name={'connectionDriver'}
                                                id={'connectionDriver'}
                                                value={datasource.password}
                                                onChange={(e) => dispatchDatasourceReducer({type: 'set_password', payload: e.target.value})}
                                            />
                                        </Field.Root>
                                    </Stack>

                                </Dialog.Body>

                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline" size={'sm'}>Cancel</Button>
                                    </Dialog.ActionTrigger>

                                    <Button variant={'outline'} size={'sm'} colorPalette={'yellow'} onClick={() => testConnection(datasource)}>Test</Button>

                                    <Button variant={'outline'} size={'sm'} colorPalette={'green'} onClick={() => setActivatedDatasource(datasource)}>Apply</Button>
                                </Dialog.Footer>

                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size={'sm'}/>
                                </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>

                    </Portal>
                </Dialog.Root>
            </Box>



        </VStack>

    );
}