const ResourceFile = require("../Domain/Configuration/Resource/ResourceFile.cjs");
const ResourceRepository = require("../Domain/Configuration/Resource/ResourceRespository.cjs");

/**
 * @implements {Application}
 */
class CreateResource {
    /**
     * @param {ResourceRepository} repository
    */
    constructor(repository) {
        this.repository = repository;
    }

    execute(path, content) {
        const resource = new ResourceFile(path, content);
        this.repository.save(resource);
    }
}

module.exports = CreateResource;
