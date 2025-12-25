const path = require("path");
const EntityFile = require("../../Domain/Configuration/EntityFile.cjs");

/**
 * @implements {Application}
 */
class CreateNewEntity {
    /**
     * @param {WorkspaceRepository} workspaceRepository
     * @param {EntityRepository} entityRepository
    */
    constructor(
        workspaceRepository,
        entityRepository
    ) {
        this.workspaceRepository = workspaceRepository;
        this.entityRepository = entityRepository;
    }

    async execute(workspacePath, name) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        
        const entityPath = path.join(workspacePath, 'entities', name + '.entity.yml');
        const entity = new EntityFile(entityPath, '');
        await this.entityRepository.save(entity);
    }
}

module.exports = CreateNewEntity;
