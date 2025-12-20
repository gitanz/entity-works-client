const ResourceFile  = require("../Domain/Configuration/Resource/ResourceFile.cjs");
const ResourceRepository = require( "../Domain/Configuration/Resource/ResourceRespository.cjs");
const fs = require('fs').promises;
const path = require('path');

class LocalFsResourceRepository extends ResourceRepository {
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
}

module.exports = LocalFsResourceRepository;
