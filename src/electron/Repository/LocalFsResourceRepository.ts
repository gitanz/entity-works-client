import type ConfigurationFile from "../Domain/Configuration/ConfigurationFile.ts";
import ResourceFile from "../Domain/Configuration/ResourceFile";
import type iConfigurationFilesRepository from "../Domain/Configuration/iConfigurationFilesRepository.ts";
import fs from "fs/promises";
import path from "path";

export default class LocalFsResourceRepository implements iConfigurationFilesRepository {
    async get(resourcePath: string): Promise<ResourceFile> {
        await fs.access(resourcePath);
        return new ResourceFile(resourcePath, '');    
    }

    async save(resource: ResourceFile): Promise<void> {
        await fs.writeFile(resource.path, resource.content, 'utf-8');
    }

    async all(resourcePath: string): Promise<ResourceFile[]> {
        const resourceExists = await fs.access(resourcePath).then(() => true).catch(() => false);
        if (!resourceExists) {
            return [];
        }

        const files = await fs.readdir(resourcePath);

        return files
            .filter(filename => filename.endsWith('.resource.yml'))
            .map(filename => new ResourceFile(path.join(resourcePath, filename)));
    }

    async rename(resource: ResourceFile, newResourcePath: string) {
        await fs.rename(resource.path, newResourcePath)
    }

    async delete(configurationFile: ConfigurationFile): Promise<void> {
        await fs.rm(configurationFile.path);
    }
}
