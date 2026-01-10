import ConfigurationFile from "./ConfigurationFile";

export default class ResourceFile extends ConfigurationFile {
    constructor(path: string, content: string = '') {
        super(path, content);

        if(!path.endsWith(".resource.yml")){
            throw new Error("Resource files must have a .resource.yml extension");
        }
    }

    getName(): string {
        const parts = this.path.split('/');
        const filename = parts[parts.length - 1];
        return filename.replace('.resource.yml', '');
    }

    getPath(): string {
        return this.path;
    }
}
