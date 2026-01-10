import type ConfigurationFile from "../../../Domain/Configuration/ConfigurationFile";
import type iConfigurationFilesRepository from "../../../Domain/Configuration/iConfigurationFilesRepository";
import ResourceFile from "../../../Domain/Configuration/ResourceFile";

export default class InMemoryResourceRepository implements iConfigurationFilesRepository {
    private resources: Map<string, ResourceFile>;

    constructor() {
        this.resources = new Map();
    }

    async get(resourcePath: string): Promise<ResourceFile> {
        const resourceFile = this.resources.get(resourcePath);

        if (!resourceFile) {
            throw new Error(`Resource not found at path: ${resourcePath}`);
        }

        return resourceFile;
    }

    async save(resource: ResourceFile): Promise<void> {
        this.resources.set(resource.path, resource);
    }

    async all(path: string): Promise<ResourceFile[]> {
        const files = Array.from(this.resources.keys())
                    .filter((filePath) => filePath.startsWith(path))
                    .filter((filePath) => filePath.includes('.resource.yml'))
                    .map((filePath) => this.resources.get(filePath))
                    .filter((entityFile): entityFile is ResourceFile => entityFile !== undefined);

        return files;
    }

    async rename(resource: ResourceFile, newResourcePath: string): Promise<void> {
        const existingResource = this.resources.get(resource.path);
        if (!existingResource) {
            return;
        }

        const renamedResource = new ResourceFile(newResourcePath, existingResource.content);
        this.resources.delete(resource.path);
        this.resources.set(newResourcePath, renamedResource);
    }

    async delete(configurationFile: ConfigurationFile): Promise<void> {
        this.resources.delete(configurationFile.path);
    }
}
