import type iWorkspaceRepository from "../../../Domain/iWorkspaceRepository";

export default class InMemoryWorkspaceRepository implements iWorkspaceRepository {

    async workspaceExists(workspacePath: string): Promise<boolean> {
        return true;
    }
}
