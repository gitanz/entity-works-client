const LocalFsWorkspaceRepository = require("../Repository/LocalFsWorkspaceRepository.cjs");
const LocalFsResourceRepository =  require("../Repository/LocalFsResourceRepository.cjs");
const ShowAllResources = require("../Application/Resources/ShowAllResources.cjs");
const CreateNewResource = require("../Application/Resources/CreateNewResource.cjs");
const RenameResource = require('../Application/Resources/RenameResource.cjs');

class ResourceHandlers {
    async index({workspacePath}) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsResourceRepository = new LocalFsResourceRepository();
        const showAllResourcesUseCase = new ShowAllResources(
            localFsWorkspaceRepository,
            localFsResourceRepository
        );

        return await showAllResourcesUseCase.execute(workspacePath);
    }

    async create(workspacePath, resourceName) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsResourceRepository = new LocalFsResourceRepository();
        const createNewResourceUseCase = new CreateNewResource(localFsWorkspaceRepository, localFsResourceRepository);

        return await createNewResourceUseCase.execute(workspacePath, resourceName);
    }

    async rename(workspacePath, resourceName, newResourceName) {
        const localFsWorkspaceRepository = new LocalFsWorkspaceRepository();
        const localFsResourceRepository = new LocalFsResourceRepository();
        const renameResourceUseCase = new RenameResource(localFsWorkspaceRepository, localFsResourceRepository);

        return await renameResourceUseCase.execute(workspacePath, resourceName, newResourceName);
    }
}

module.exports = ResourceHandlers;
