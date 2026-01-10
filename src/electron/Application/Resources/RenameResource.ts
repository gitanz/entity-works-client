import path from "path";
import type iWorkspaceRepository from "../../Domain/iWorkspaceRepository.ts";
import type iConfigurationFilesRepository from "../../Domain/Configuration/iConfigurationFilesRepository.ts";
import type { Application } from "../Application.ts";

export default class RenameResource implements Application<[string, string, string], void> {
    private workspaceRepository: iWorkspaceRepository;
    private resourceRepository: iConfigurationFilesRepository;

    constructor(workspaceRepository: iWorkspaceRepository, resourceRepository: iConfigurationFilesRepository) {
        this.workspaceRepository = workspaceRepository;
        this.resourceRepository = resourceRepository;
    }

    async execute(workspacePath: string, resourceName: string, newResourceName:  string) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        const resourcePath = path.join(workspacePath, 'resources', resourceName + '.resource.yml');
        const resource = await this.resourceRepository.get(resourcePath);

        const newResourcePath = path.join(workspacePath, 'resources', newResourceName + '.resource.yml');
        await this.resourceRepository.rename(resource, newResourcePath);
    }
}
