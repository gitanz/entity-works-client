import fs from 'fs/promises';
import type iWorkspaceRepository from '../../../Domain/iWorkspaceRepository';

export default class LocalFsWorkspaceRepository implements iWorkspaceRepository {
    async workspaceExists(workspacePath: string): Promise<boolean> {
        try {
            await fs.access(workspacePath);
            return true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            return false;
        }
    }
}
