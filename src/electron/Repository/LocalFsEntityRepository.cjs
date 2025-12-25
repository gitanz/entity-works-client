const EntityFile  = require("../Domain/Configuration/EntityFile.cjs");
const FilesRepository = require( "../Domain/Configuration/FilesRepository.cjs");
const fs = require('fs').promises;
const path = require('path');

class LocalFsEntityRepository extends FilesRepository {

    async get(entityPath) {
        const access = await fs.access(entityPath);
        return new EntityFile(entityPath, '');    
    }

    async save(entity) {
        await fs.writeFile(entity.path, entity.content, 'utf-8');
    }

    async all(entityPath) {
        const entityExists = await fs.access(entityPath).then(() => true).catch(() => false);
        if (!entityExists) {
            return [];
        }

        const files = await fs.readdir(entityPath);

        const entities = files
            .filter(filename => filename.endsWith('.entity.yml'))
            .map(filename => new EntityFile(path.join(entityPath, filename)));
        
        return entities;
    }

    async rename(entity, newEntityPath) {
        await fs.rename(entity.path, newEntityPath)
    }
}

module.exports = LocalFsEntityRepository;
