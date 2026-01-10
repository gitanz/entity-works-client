import InMemoryResourceRepository from "../../Adapters/Repository/ResourceRepository/InMemoryResourceRepository";
import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import ResourceFile from "../../Domain/Configuration/ResourceFile";
import DeleteResource from "./DeleteResource";

describe('DeleteResource', () => {
    it('should delete an existing resource from the specified workspace', async () => {
        const workspaceRepository = new InMemoryWorkspaceRepository();
        const resourceRepository = new InMemoryResourceRepository();
        const resourceFile = new ResourceFile('/path/to/workspace/resources/resource-to-delete.resource.yml', '');
        await resourceRepository.save(resourceFile);
        
        let allResources = await resourceRepository.all('/path/to/workspace/resources');
        expect(allResources).toHaveLength(1);

        const deleteResource = new DeleteResource(
            workspaceRepository,
            resourceRepository
        );
        await deleteResource.execute('/path/to/workspace', 'resource-to-delete');

        const resources = await resourceRepository.all('/path/to/workspace/resources');
        expect(resources).toHaveLength(0);
    });
});
