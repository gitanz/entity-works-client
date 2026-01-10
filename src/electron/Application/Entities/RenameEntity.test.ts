import InMemoryEntityRepository from "../../Adapters/Repository/EntityRepository/InMemoryEntityRepository";
import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import EntityFile from "../../Domain/Configuration/EntityFile";
import RenameEntity from "./RenameEntity";

describe('RenameEntity', () => {
    it('should rename an existing entity in the specified workspace', async () => {
        const workspaceRepository = new InMemoryWorkspaceRepository();
        const entityRepository = new InMemoryEntityRepository();
        const entityFile = new EntityFile('/path/to/workspace/entities/old-entity-name.entity.yml', '');
        await entityRepository.save(entityFile);
        
        const renameEntity = new RenameEntity(
            workspaceRepository,
            entityRepository
        );
        await renameEntity.execute('/path/to/workspace', 'old-entity-name', 'new-entity-name');

        const entities = await entityRepository.all('/path/to/workspace/entities');
        expect(entities).toHaveLength(1);
        expect(entities[0].path).toBe('/path/to/workspace/entities/new-entity-name.entity.yml');
    });
});