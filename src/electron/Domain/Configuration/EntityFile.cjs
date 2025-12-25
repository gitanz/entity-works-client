const YmlFile = require( "./ConfigurationFile.cjs");

class EntityFile extends YmlFile {
    constructor(path, content = '') {
        super(path, content);

        if(!path.endsWith(".entity.yml")){    
            throw new Error("Entity files must have a .entity.yml extension");
        }
    }

    getName() {
        const parts = this.path.split('/');
        const filename = parts[parts.length - 1];
        return filename.replace('.entity.yml', '');
    }

    getPath() {
        return this.path;
    }
}

module.exports = EntityFile;