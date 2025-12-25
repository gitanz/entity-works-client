const ResourceFile  = require("../Domain/Configuration/ResourceFile.cjs");
const FilesRepository = require( "../Domain/Configuration/FilesRepository.cjs");
const fs = require('fs').promises;
const path = require('path');

class LocalFsResourceRepository extends FilesRepository {

    async get(resourcePath) {
        const access = await fs.access(resourcePath);
        return new ResourceFile(resourcePath, '');    
    }

    async save(resource) {
        await fs.writeFile(resource.path, resource.content, 'utf-8');
    }

    async all(resourcePath) {
        const resourceExists = await fs.access(resourcePath).then(() => true).catch(() => false);
        if (!resourceExists) {
            return [];
        }

        const files = await fs.readdir(resourcePath);

        const resources = files
            .filter(filename => filename.endsWith('.resource.yml'))
            .map(filename => new ResourceFile(path.join(resourcePath, filename)));
        
        return resources;
    }

    async rename(resource, newResourcePath) {
        await fs.rename(resource.path, newResourcePath)
    }
}

module.exports = LocalFsResourceRepository;
