import { GridItem } from "@chakra-ui/react";

export default function Titlebar({children}: {children?: React.ReactNode}) {
    return (
        <GridItem
            style={{
                appRegion: "drag",
                lineHeight: "12px",
                fontSize: "12px",
                padding: "6px 0",
                alignContent: "center"
            }}
            gridArea={"titlebar"}
            borderBottomWidth="1px"
            borderBottomColor="border"
        >
            {children}
        </GridItem>
    );
}
