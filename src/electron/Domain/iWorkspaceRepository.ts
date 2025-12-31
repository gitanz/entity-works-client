export default interface iWorkspaceRepository {
    workspaceExists(workspacePath: string): Promise<boolean>;
}
