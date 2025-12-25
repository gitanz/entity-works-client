const path = require("path");

class RenameEntity {
    constructor(workspaceRepository, entityRepository) {
        this.workspaceRepository = workspaceRepository;
        this.entityRepository = entityRepository;
    }

    async execute(workspacePath, entityName, newEntityName) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }
        const entityPath = path.join(workspacePath, 'entities', entityName + '.entity.yml');
        const entity = await this.entityRepository.get(entityPath);

        const newEntityPath = path.join(workspacePath, 'entities', newEntityName + '.entity.yml');
        this.entityRepository.rename(entity, newEntityPath);
    }
}

module.exports = RenameEntity;
