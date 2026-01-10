import path from "path";
import type iWorkspaceRepository from "../../Domain/iWorkspaceRepository.ts";
import type iConfigurationFilesRepository from "../../Domain/Configuration/iConfigurationFilesRepository.ts";
import type { Application } from "../Application.ts";

export default class ShowAllResources implements Application<[string], Array<{ name: string; path: string }> > {
    private workspaceRepository: iWorkspaceRepository;
    private resourceRepository: iConfigurationFilesRepository;

    constructor(
        workspaceRepository: iWorkspaceRepository,
        resourceRepository: iConfigurationFilesRepository
    ) {
        this.workspaceRepository = workspaceRepository;
        this.resourceRepository = resourceRepository;
    }

    async execute(workspacePath: string) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }

        const resources = await this.resourceRepository.all(path.join(workspacePath, 'resources'));

        return resources.map(resource => { return { name: resource.getName(), path: resource.getPath() }; });
    }
}
