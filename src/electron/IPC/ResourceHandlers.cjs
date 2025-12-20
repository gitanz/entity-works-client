const LocalFsWorkspaceRepository = require("../Repository/LocalFsWorkspaceRepository.cjs");
const LocalFsResourceRepository =  require("../Repository/LocalFsResourceRepository.cjs");
const ShowAllResources = require("../Application/ShowAllResources.cjs");

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
}

module.exports = ResourceHandlers;
