import type { IconType } from "react-icons";

export type Files = File[];

export interface File {
    name: string,
    path: string
}

export interface FileField {
    value: any,
    error: boolean,
    errorMessage: string
}

export interface RenameFileField extends FileField {
    rename: boolean,
    fileName: string
} 

export interface FileApi {
    add: (params: {workspacePath: string, fileName: string}) => Promise<void>,
    rename: (params: {workspacePath: string, fileName: string, newFileName: string}) => Promise<void>,
    index: (params: {workspacePath: string}) => Promise<File[]>,
    delete: (params: {workspacePath: string, fileName: string}) => Promise<void>
}

export type ExplorerConfiguration = {api: FileApi, label: string, icon: IconType};

export interface ExplorerType {
    resource: ExplorerConfiguration,
    entity: ExplorerConfiguration
}