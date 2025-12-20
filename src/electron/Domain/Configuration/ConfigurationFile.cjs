class YmlFile {
    constructor(path, content) {
        if(!path) {
            throw new Error('Path is required');
        }

        if (!path.endsWith('.yml') && !path.endsWith('.yaml')) {
            throw new Error('File must have a .yml or .yaml extension');
        }
        
        this.path = path;
        this.content = content;
    }   
}

module.exports = YmlFile;
