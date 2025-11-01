export const ResizeModeEnums = {
    LEFT: "left",
    RIGHT: "right",
    BOTTOM: "bottom"
} as const

export type ResizeMode = typeof ResizeModeEnums[keyof typeof ResizeModeEnums];

export type DirectionMap = {
    [key in ResizeMode]: String
}

export type Nullable<T> = T | null;