const path = require('path');

/// <reference path="./Application.cjs" />

/**
 * @implements {Application}
 */
class ShowAllResources {
    constructor(
        WorkspaceRepository,
        ResourceRepository
    ) {
        this.workspaceRepository = WorkspaceRepository;
        this.resourceRepository = ResourceRepository;
    }

    async execute(workspacePath) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }

        console.log('Loading all resources from workspace:', workspacePath);

        const resources = await this.resourceRepository.all(path.join(workspacePath, 'resources'));

        return resources.map(resource => resource.getName());
    }
}

module.exports = ShowAllResources;
