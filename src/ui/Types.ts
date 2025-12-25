export const ResizeModeEnums = {
    LEFT: "left",
    RIGHT: "right",
    BOTTOM: "bottom"
} as const

export type ResizeMode = typeof ResizeModeEnums[keyof typeof ResizeModeEnums];

export type DirectionMap = {
    [key in ResizeMode]: String
}

export type KeyValue<T> = {
    [key:string]: T
}
export type Nullable<T> = T | null;

export type LayoutSize = "sm" | "md" | "lg" | undefined;

export type LayoutSpecs = {
    menuBarWidth: number,
    titleBarHeight: number,
    statusBarHeight: number
}

export interface ShellState {
    layout: string,
    setLayout?: (value: string) => void,
    workspacePath?: Nullable<string>,
    setWorkspacePath?: (value: Nullable<string>) => void,
    activatedModuleId: string,
    setActivatedModuleId?: (value: string) => void,
}

export interface IModuleState {
    id?: Nullable<string>,
    moduleLayout?: IModuleLayoutState
}

export interface IModuleLayoutState {
    explorer: Nullable<Number>,
    setExplorer: (value: Number) => void,
    palette: Nullable<Number>,
    setPalette: (value: Number) => void,
    drawer: Nullable<Number>,
    setDrawer: (value: Number) => void,
}

export type ModuleId = string;

export interface IModuleContext {
    activeModuleId: ModuleId,
}

export interface ActiveModuleState {

}

export interface IWelcomeModuleState extends ActiveModuleState {
    projectPath?:  ProjectPath,
    setProjectPath?: (value: ProjectPath) => void
}

export type ProjectPath = string;
