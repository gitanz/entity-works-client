import { Flex, GridItem } from "@chakra-ui/react";
import { VscFiles } from "react-icons/vsc";

export default function AppMenu() {
    return (
        <GridItem
            gridArea={"app-menu"}
            borderRightWidth="1px"
            borderRightColor="border"
            borderBottomWidth="1px"
            borderBottomColor="border"
        >

            <Flex
                direction={"column"}
                fontSize="2xl"
                alignItems={'center'}
            >
                <Flex 
                    padding="15px 0" 
                    cursor={'pointer'} 
                    width={"50px"} 
                    justifyContent={"center"}
                    color={"colorPalette.solid"}
                    >
                    <VscFiles></VscFiles>
                </Flex>
            </Flex>
        </GridItem>
    );
}
