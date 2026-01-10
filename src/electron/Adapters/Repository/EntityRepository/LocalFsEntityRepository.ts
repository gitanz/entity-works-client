
import fs from "fs/promises";
import path from "path";
import type iConfigurationFilesRepository from "../../../Domain/Configuration/iConfigurationFilesRepository";
import EntityFile from "../../../Domain/Configuration/EntityFile";
import type ConfigurationFile from "../../../Domain/Configuration/ConfigurationFile";

export default class LocalFsEntityRepository implements iConfigurationFilesRepository {
    async get(entityPath: string): Promise<EntityFile> {
        await fs.access(entityPath);
        return new EntityFile(entityPath, '');    
    }

    async save(entity: EntityFile): Promise<void> {
        await fs.writeFile(entity.path, entity.content, 'utf-8');
    }

    async all(entityPath: string): Promise<EntityFile[]> {
        const entityExists = await fs.access(entityPath).then(() => true).catch(() => false);
        if (!entityExists) {
            return [];
        }

        const files = await fs.readdir(entityPath);

        return files
            .filter(filename => filename.endsWith('.entity.yml'))
            .map(filename => new EntityFile(path.join(entityPath, filename)));
    }

    async rename(entity: EntityFile, newEntityPath: string): Promise<void> {
        await fs.rename(entity.path, newEntityPath)
    }

    async delete(configurationFile: ConfigurationFile): Promise<void> {
        await fs.rm(configurationFile.path);
    }
}
