import LocalFsWorkspaceRepository from "../Repository/LocalFsWorkspaceRepository";
import LocalFsResourceRepository from "../Repository/LocalFsResourceRepository";
import ShowAllResources from "../Application/Resources/ShowAllResources";
import CreateNewResource from "../Application/Resources/CreateNewResource";
import RenameResource from "../Application/Resources/RenameResource";
import DeleteResource from "../Application/Resources/DeleteResource";

interface IndexResourceParams {
    workspacePath: string;
}

interface CreateResourceParams {
    workspacePath: string;
    fileName: string;
}

interface RenameResourceParams {
    workspacePath: string;
    fileName: string;
    newFileName: string;
}


export default class ResourceHandlers {
    async index({workspacePath}:IndexResourceParams) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsResourceRepository = new LocalFsResourceRepository();
        const showAllResourcesUseCase = new ShowAllResources(
            localFsWorkspaceRepository,
            localFsResourceRepository
        );

        return await showAllResourcesUseCase.execute(workspacePath);
    }

    async create({workspacePath, fileName: resourceName }:CreateResourceParams  ) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsResourceRepository = new LocalFsResourceRepository();
        const createNewResourceUseCase = new CreateNewResource(localFsWorkspaceRepository, localFsResourceRepository);

        return await createNewResourceUseCase.execute(workspacePath, resourceName);
    }

    async rename({workspacePath, fileName:resourceName, newFileName:newResourceName}:RenameResourceParams) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsResourceRepository = new LocalFsResourceRepository();
        const renameResourceUseCase = new RenameResource(localFsWorkspaceRepository, localFsResourceRepository);

        return await renameResourceUseCase.execute(workspacePath, resourceName, newResourceName);
    }

    async delete({workspacePath, fileName:resourceName}:CreateResourceParams) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsResourceRepository = new LocalFsResourceRepository();
        const deleteResourceUseCase = new DeleteResource(localFsWorkspaceRepository, localFsResourceRepository);

        return await deleteResourceUseCase.execute(workspacePath, resourceName);
    }
}
