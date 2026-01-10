import type ConfigurationFile from "../../../Domain/Configuration/ConfigurationFile";
import EntityFile from "../../../Domain/Configuration/EntityFile";
import type iConfigurationFilesRepository from "../../../Domain/Configuration/iConfigurationFilesRepository";

export default class InMemoryEntityRepository implements iConfigurationFilesRepository {
    public entities: Map<string, EntityFile>;

    constructor() {
        this.entities = new Map();
    }

    async get(entityPath: string): Promise<EntityFile> {
        const entityFile = this.entities.get(entityPath);
        
        if (!entityFile) {
            throw new Error(`Entity not found at path: ${entityPath}`);
        }

        return entityFile;
    }

    async save(entity: EntityFile): Promise<void> {
        this.entities.set(entity.path, entity);
    }

    async all(path: string): Promise<EntityFile[]> {
        const files = Array.from(this.entities.keys())
            .filter((filePath) => filePath.startsWith(path))
            .filter((filePath) => filePath.includes('.entity.yml'))
            .map((filePath) => this.entities.get(filePath))
            .filter((entityFile): entityFile is EntityFile => entityFile !== undefined);
        
        return files;
    }

    async rename(entity: EntityFile, newEntityPath: string): Promise<void> {
        const existingEntity = this.entities.get(entity.path);
        if (!existingEntity) {
            return;
        }
        
        const renamedEntity = new EntityFile(newEntityPath, existingEntity.content);
        this.entities.delete(entity.path);
        this.entities.set(newEntityPath, renamedEntity);
    }

    async delete(configurationFile: ConfigurationFile): Promise<void> {
        this.entities.delete(configurationFile.path);
    }
}
