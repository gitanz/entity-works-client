import { Box } from "@chakra-ui/react";

interface ToggleIconProps {
    isActive: boolean;
    onClick: () => void;
    ActiveIcon: React.ElementType;
    InactiveIcon: React.ElementType;
    fontSize?: string
}

export function ToggleIcon({isActive, onClick, ActiveIcon, InactiveIcon, fontSize}: ToggleIconProps) {
    return (
        <Box 
            style={{
                cursor: 'pointer'
            }}
            fontSize={fontSize ?? 'md'}
            onClick={onClick}>
            { isActive ? <ActiveIcon/> : <InactiveIcon/> } 
        </Box>
    );
}
