import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import InMemoryResourceRepository from "../../Adapters/Repository/ResourceRepository/InMemoryResourceRepository";
import ResourceFile from "../../Domain/Configuration/ResourceFile";
import RenameResource from "./RenameResource";

describe('RenameResource', () => {
    it('should rename an existing resource in the specified workspace', async () => {
        const workspaceRepository = new InMemoryWorkspaceRepository();
        const resourceRepository = new InMemoryResourceRepository();
        const resourceFile = new ResourceFile('/path/to/workspace/resources/old-resource-name.resource.yml', '');
        await resourceRepository.save(resourceFile);

        const renameResource = new RenameResource(
            workspaceRepository,
            resourceRepository
        );
        await renameResource.execute('/path/to/workspace', 'old-resource-name', 'new-resource-name');   

        const resources = await resourceRepository.all('/path/to/workspace/resources');
        expect(resources).toHaveLength(1);
        expect(resources[0].path).toBe('/path/to/workspace/resources/new-resource-name.resource.yml');
    });
});