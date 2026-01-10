import path from "path";
import EntityFile from "../../Domain/Configuration/EntityFile";
import type iWorkspaceRepository from "../../Domain/iWorkspaceRepository.ts";
import type iConfigurationFilesRepository from "../../Domain/Configuration/iConfigurationFilesRepository.ts";
import type { Application } from "../Application.ts";

export default class CreateNewEntity implements Application<[string, string], void> {

    private workspaceRepository: iWorkspaceRepository;
    private entityRepository: iConfigurationFilesRepository;

    /**
     * @param {WorkspaceRepository} workspaceRepository
     * @param {EntityRepository} entityRepository
    */
    constructor(
        workspaceRepository: iWorkspaceRepository,
        entityRepository: iConfigurationFilesRepository
    ) {
        this.workspaceRepository = workspaceRepository;
        this.entityRepository = entityRepository;
    }

    async execute(workspacePath: string, name: string): Promise<void> {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        
        const entityPath = path.join(workspacePath, 'entities', name + '.entity.yml');
        const entity = new EntityFile(entityPath, '');
        await this.entityRepository.save(entity);
    }
}
