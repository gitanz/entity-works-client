import path from "path";
import type iWorkspaceRepository from "../../Domain/iWorkspaceRepository.ts";
import type iConfigurationFilesRepository from "../../Domain/Configuration/iConfigurationFilesRepository.ts";

export default class DeleteResource {

    private workspaceRepository: iWorkspaceRepository;
    private resourceRepository: iConfigurationFilesRepository;

    constructor(workspaceRepository: iWorkspaceRepository, resourceRepository: iConfigurationFilesRepository) {
        this.workspaceRepository = workspaceRepository;
        this.resourceRepository = resourceRepository;
    }

    async execute(workspacePath: string, resourceName: string) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        const resourcePath = path.join(workspacePath, 'resources', resourceName + '.resource.yml');
        const resource = await this.resourceRepository.get(resourcePath);

        await this.resourceRepository.delete(resource);
    }
}
