import path from "path";
import ResourceFile from "../../Domain/Configuration/ResourceFile";
import type iWorkspaceRepository from "../../Domain/iWorkspaceRepository.ts";
import type iConfigurationFilesRepository from "../../Domain/Configuration/iConfigurationFilesRepository.ts";
import type { Application } from "../Application.ts";

export default class CreateNewResource implements Application<[string, string], void> {

    private workspaceRepository: iWorkspaceRepository;
    private resourceRepository: iConfigurationFilesRepository;

    constructor(
        workspaceRepository: iWorkspaceRepository,
        resourceRepository: iConfigurationFilesRepository
    ) {
        this.workspaceRepository = workspaceRepository;
        this.resourceRepository = resourceRepository;
    }

    async execute(workspacePath: string, name: string) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        
        const resourcePath = path.join(workspacePath, 'resources', name + '.resource.yml');
        const resource = new ResourceFile(resourcePath, '');
        await this.resourceRepository.save(resource);
    }
}
