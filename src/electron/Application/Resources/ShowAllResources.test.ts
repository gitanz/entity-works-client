import InMemoryResourceRepository from "../../Adapters/Repository/ResourceRepository/InMemoryResourceRepository";
import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import ResourceFile from "../../Domain/Configuration/ResourceFile";
import ShowAllResources from "./ShowAllResources";

describe('ShowAllEntities', () => {
    it('should show all entities in the workspace', async () => {
        const workspacePath = '/path/to/workspace';
        const inMemoryWorkspaceRepository = new InMemoryWorkspaceRepository();
        const inMemoryResourceRepository = new InMemoryResourceRepository();
        const entityFile = new ResourceFile('/path/to/workspace/resources/resource1.resource.yml', '');
        await inMemoryResourceRepository.save(entityFile);

        const showAllResourcesUseCase = new ShowAllResources(
            inMemoryWorkspaceRepository,
            inMemoryResourceRepository
        );

        const entities = await showAllResourcesUseCase.execute(workspacePath);

        expect(entities).toBeInstanceOf(Array);
        expect(entities).toHaveLength(1);
        expect(entities[0].path).toBe('/path/to/workspace/resources/resource1.resource.yml');
    });
});
