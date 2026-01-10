import InMemoryResourceRepository from "../../Adapters/Repository/ResourceRepository/InMemoryResourceRepository";
import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import CreateNewResource from "./CreateNewResource";

describe('CreateNewResource', () => {
    it('should create a new resource in the specified workspace', async () => {
        const workspaceRepository = new InMemoryWorkspaceRepository();
        const resourceRepository = new InMemoryResourceRepository();
        const createNewResource = new CreateNewResource(
            workspaceRepository,
            resourceRepository
        );

        await createNewResource.execute('/path/to/workspace', 'test-resource');
        const entities = await resourceRepository.all('/path/to/workspace/resources');
        expect(entities).toHaveLength(1);
        expect(entities[0].path).toBe('/path/to/workspace/resources/test-resource.resource.yml');
    });
});