const LocalFsWorkspaceRepository = require("../Repository/LocalFsWorkspaceRepository.cjs");
const LocalFsEntityRepository =  require("../Repository/LocalFsEntityRepository.cjs");
const ShowAllEntities = require("../Application/Entities/ShowAllEntities.cjs");
const CreateNewEntity = require("../Application/Entities/CreateNewEntity.cjs");
const RenameEntity = require('../Application/Entities/RenameEntity.cjs');

class EntityHandlers {
    async index({workspacePath}) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsEntityRepository = new LocalFsEntityRepository();
        const showAllEntitiesUseCase = new ShowAllEntities(
            localFsWorkspaceRepository,
            localFsEntityRepository
        );

        return await showAllEntitiesUseCase.execute(workspacePath);
    }

    async create(workspacePath, entityName) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsEntityRepository = new LocalFsEntityRepository();
        const createNewEntityUseCase = new CreateNewEntity(localFsWorkspaceRepository, localFsEntityRepository);

        return await createNewEntityUseCase.execute(workspacePath, entityName);
    }

    async rename(workspacePath, entityName, newEntityName) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsEntityRepository = new LocalFsEntityRepository();
        const renameEntityUseCase = new RenameEntity(localFsWorkspaceRepository, localFsEntityRepository);

        return await renameEntityUseCase.execute(workspacePath, entityName, newEntityName);
    }
}

module.exports = EntityHandlers;
