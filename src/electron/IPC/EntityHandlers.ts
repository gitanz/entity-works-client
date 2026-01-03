import LocalFsWorkspaceRepository from "../Repository/LocalFsWorkspaceRepository";
import LocalFsEntityRepository from "../Repository/LocalFsEntityRepository";
import ShowAllEntities from "../Application/Entities/ShowAllEntities";
import CreateNewEntity from "../Application/Entities/CreateNewEntity";
import RenameEntity from '../Application/Entities/RenameEntity';
import DeleteEntity from "../Application/Entities/DeleteEntity";

export default class EntityHandlers {
    async index({workspacePath}: {workspacePath: string}) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsEntityRepository = new LocalFsEntityRepository();
        const showAllEntitiesUseCase = new ShowAllEntities(
            localFsWorkspaceRepository,
            localFsEntityRepository
        );

        return await showAllEntitiesUseCase.execute(workspacePath);
    }

    async create({workspacePath, fileName: entityName } : {workspacePath: string, fileName: string}  ) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsEntityRepository = new LocalFsEntityRepository();
        const createNewEntityUseCase = new CreateNewEntity(localFsWorkspaceRepository, localFsEntityRepository);

        return await createNewEntityUseCase.execute(workspacePath, entityName);
    }

    async rename({workspacePath, fileName:entityName, newFileName:newEntityName} : {workspacePath: string, fileName: string, newFileName: string}) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsEntityRepository = new LocalFsEntityRepository();
        const renameEntityUseCase = new RenameEntity(localFsWorkspaceRepository, localFsEntityRepository);

        return await renameEntityUseCase.execute(workspacePath, entityName, newEntityName);
    }

    async delete({workspacePath, fileName:entityName}: {workspacePath: string, fileName: string}) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsEntityRepository = new LocalFsEntityRepository();
        const deleteEntityUseCase = new DeleteEntity(localFsWorkspaceRepository, localFsEntityRepository);

        return await deleteEntityUseCase.execute(workspacePath, entityName);
    }
}

