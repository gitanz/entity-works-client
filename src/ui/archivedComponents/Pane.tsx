
import { Box, Stack, styled } from "@mui/material"
import type { ReactNode } from "react"
import { ResizeModeEnums, type ResizeMode, type DirectionMap } from "../types"
import "./Pane.css";

interface Props {
    children: ReactNode
    mode: ResizeMode
    className: string
}

export default function Pane(props: Props) {

    const directionMap: DirectionMap = {
        [ResizeModeEnums.LEFT]: "row",
        [ResizeModeEnums.RIGHT]: "row-reverse",
        [ResizeModeEnums.BOTTOM]: "column-reverse"
    }

    return (
        <Stack direction={directionMap[props.mode] ?? 'row'}>
            <Box className={props.className}>
                {props.children}
            </Box>
            <div className={`resizer ${props.mode}`}></div>
        </Stack>
    )
}
