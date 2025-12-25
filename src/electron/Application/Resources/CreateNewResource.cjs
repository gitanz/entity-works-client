const path = require("path");
const ResourceFile = require("../../Domain/Configuration/ResourceFile.cjs");

/**
 * @implements {Application}
 */
class CreateNewResource {
    /**
     * @param {WorkspaceRepository} workspaceRepository
     * @param {ResourceRepository} resourceRepository
    */
    constructor(
        workspaceRepository,
        resourceRepository
    ) {
        this.workspaceRepository = workspaceRepository;
        this.resourceRepository = resourceRepository;
    }

    async execute(workspacePath, name) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        
        const resourcePath = path.join(workspacePath, 'resources', name + '.resource.yml');
        const resource = new ResourceFile(resourcePath, '');
        await this.resourceRepository.save(resource);
    }
}

module.exports = CreateNewResource;
