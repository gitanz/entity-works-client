const path = require("path");

class RenameResource {
    constructor(workspaceRepository, resourceRepository) {
        this.workspaceRepository = workspaceRepository;
        this.resourceRepository = resourceRepository;
    }

    async execute(workspacePath, resourceName, newResourceName) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        const resourcePath = path.join(workspacePath, resourceName, '.resource.yml');
        const resource = this.resourceRepository.get(resourcePath);

        const newResourcePath = path.join(workspacePath, newResourceName, '.resource.yml');
        this.resourceRepository.rename(resource, newResourcePath);
    }
}

module.exports = RenameResource;
