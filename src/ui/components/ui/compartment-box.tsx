import { Accordion, Box, Heading, Span } from "@chakra-ui/react";
import { useShellContext } from "../../shell/ShellContext";

const compartmentBox = ({name, children}: {name: string, children?: React.ReactNode}) => {
    const { size } = useShellContext();
    return (
        <>
            <Heading mx='7' fontSize='xs' textTransform="uppercase">{name}</Heading>
            <Accordion.Root collapsible size={size} fontSize='xs' multiple>
                {children}
            </Accordion.Root>
        </>
    )
}

const compartment = ({name, children}: {name: string, children?: React.ReactNode}) => {
    return (
        <Accordion.Item value={name}>
            <Accordion.ItemTrigger>
                <Accordion.ItemIndicator />
                <Span flex="1" fontWeight="bold" textTransform="uppercase" fontSize='xs'>{name}</Span>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
                <Accordion.ItemBody padding={0}>
                    <Box fontSize='xs'>
                        {children}
                    </Box>
                </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
}

export const CompartmentBox = {
    Box: compartmentBox,
    Compartment: compartment
};