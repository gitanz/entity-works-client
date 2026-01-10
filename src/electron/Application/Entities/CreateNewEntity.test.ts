import InMemoryEntityRepository from "../../Adapters/Repository/EntityRepository/InMemoryEntityRepository";
import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import CreateNewEntity from "./CreateNewEntity";

describe('CreateNewEntity', () => {
    it('should create a new entity in the specified workspace', async () => {
        const workspaceRepository = new InMemoryWorkspaceRepository();
        const entityRepository = new InMemoryEntityRepository();
        const createNewEntity = new CreateNewEntity(
            workspaceRepository,
            entityRepository
        );

        await createNewEntity.execute('/path/to/workspace', 'test-entity');
        const entities = await entityRepository.all('/path/to/workspace/entities');
        expect(entities).toHaveLength(1);
        expect(entities[0].path).toBe('/path/to/workspace/entities/test-entity.entity.yml');
    });
});