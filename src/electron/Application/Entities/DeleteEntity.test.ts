import InMemoryEntityRepository from "../../Adapters/Repository/EntityRepository/InMemoryEntityRepository";
import InMemoryWorkspaceRepository from "../../Adapters/Repository/WorkspaceRepository/InMemoryWorkspaceRepository";
import EntityFile from "../../Domain/Configuration/EntityFile";
import DeleteEntity from "./DeleteEntity";

describe('DeleteEntity', () => {
    it('should delete an existing entity from the specified workspace', async () => {
        const workspaceRepository = new InMemoryWorkspaceRepository();
        const entityRepository = new InMemoryEntityRepository();
        const entityFile = new EntityFile('/path/to/workspace/entities/entity-to-delete.entity.yml', '');
        await entityRepository.save(entityFile);
        
        let allEntities = await entityRepository.all('/path/to/workspace/entities');
        expect(allEntities).toHaveLength(1);

        const deleteEntity = new DeleteEntity(
            workspaceRepository,
            entityRepository
        );
        await deleteEntity.execute('/path/to/workspace', 'entity-to-delete');

        const entities = await entityRepository.all('/path/to/workspace/entities');
        expect(entities).toHaveLength(0);
    });
});
