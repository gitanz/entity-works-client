import { GridItem } from "@chakra-ui/react";

export default function Statusbar({children}: {children?: React.ReactNode}) {

    return (
        <GridItem
            overflow="clip"
            gridArea={"statusbar"}
            borderLeftWidth="1px"
            borderLeftColor="border"
            borderRightWidth="1px"
            borderRightColor="border"
            borderBottomWidth="1px"
            borderBottomColor="border"
        >             
            {children}
        </GridItem>
    );
}