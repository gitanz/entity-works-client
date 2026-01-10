import path from "path";
import type iWorkspaceRepository from "../../Domain/iWorkspaceRepository.ts";
import type iConfigurationFilesRepository from "../../Domain/Configuration/iConfigurationFilesRepository.ts";
import type ConfigurationFile from "../../Domain/Configuration/ConfigurationFile.ts";
import type { Application } from "../Application.ts";

export default class ShowAllEntities implements Application<[string], Array<{ name: string; path: string }> > {
    private workspaceRepository: iWorkspaceRepository;
    private entityRepository: iConfigurationFilesRepository;

    constructor(
        WorkspaceRepository: iWorkspaceRepository,
        EntityRepository: iConfigurationFilesRepository
    ) {
        this.workspaceRepository = WorkspaceRepository;
        this.entityRepository = EntityRepository;
    }

    async execute(workspacePath: string): Promise<Array<{ name: string; path: string }>> {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }

        const entities: ConfigurationFile[] = await this.entityRepository.all(path.join(workspacePath, 'entities'));

        return entities.map(entity   => { return { name: entity.getName(), path: entity.getPath() }; });
    }
}
