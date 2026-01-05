import { Box, Heading, Stack, VStack } from "@chakra-ui/react";

const compartmentBox = ({name, children}: {name: string, children?: React.ReactNode}) => {
    return (
        <VStack height={'full'} width={'full'} overflowY={'hidden'} alignItems={'flex-start'}>
            <Heading px='2.5' width={'full'} fontSize='xs' textTransform="uppercase">{name}</Heading>
            {children}
        </VStack>
    )
}

const compartment = ({name, children}: {name: string, children?: React.ReactNode}) => {
    return (
        <Box 
            fontSize='xs'
            height={'full'}
            overflowY={'hidden'}
            width={'full'}
            > 
                <Heading px='2.5' width={'full'} fontSize='xs' textTransform="uppercase">{name}</Heading>    
            {children}
        </Box>
        
    );
}

export const CompartmentBox = {
    Box: compartmentBox,
    Compartment: compartment
};