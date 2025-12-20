const YmlFile = require( "../ConfigurationFile.cjs");

class ResourceFile extends YmlFile {
    constructor(path, content = '') {
        super(path, content);

        if(!path.endsWith(".resource.yml")){    
            throw new Error("Resource files must have a .resource.yml extension");
        }
    }

    getName() {
        const parts = this.path.split('/');
        const filename = parts[parts.length - 1];
        return filename.replace('.resource.yml', '');
    }
}

module.exports = ResourceFile;