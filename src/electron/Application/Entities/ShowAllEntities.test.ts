import InMemoryEntityRepository from "../../Adapters/Repository/EntityRepository/InMemoryEntityRepository";
import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import EntityFile from "../../Domain/Configuration/EntityFile";
import ShowAllEntities from "./ShowAllEntities";

describe('ShowAllEntities', () => {
    it('should show all entities in the workspace', async () => {
        const workspacePath = '/path/to/workspace';
        const inMemoryWorkspaceRepository = new InMemoryWorkspaceRepository();
        const inMemoryEntityRepository = new InMemoryEntityRepository();
        const entityFile = new EntityFile('/path/to/workspace/entities/entity1.entity.yml', '');
        await inMemoryEntityRepository.save(entityFile);

        const showAllEntitiesUseCase = new ShowAllEntities(
            inMemoryWorkspaceRepository,
            inMemoryEntityRepository
        );
        
        const entities = await showAllEntitiesUseCase.execute(workspacePath);

        expect(entities).toBeInstanceOf(Array);
        expect(entities).toHaveLength(1);
        expect(entities[0].path).toBe('/path/to/workspace/entities/entity1.entity.yml');
    });
});
