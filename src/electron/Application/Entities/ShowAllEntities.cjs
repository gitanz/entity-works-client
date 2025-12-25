const path = require('path');

/// <reference path="./Application.cjs" />

/**
 * @implements {Application}
 */
class ShowAllEntities {
    constructor(
        WorkspaceRepository,
        EntityRepository
    ) {
        this.workspaceRepository = WorkspaceRepository;
        this.entityRepository = EntityRepository;
    }

    async execute(workspacePath) {
        const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
        if (!workspaceExists) {
            throw new Error('Workspace does not exist');
        }

        const entities = await this.entityRepository.all(path.join(workspacePath, 'entities'));

        return entities.map(entity => { return { name: entity.getName(), path: entity.getPath() }; });
    }
}

module.exports = ShowAllEntities;
