import ConfigurationFile from "./ConfigurationFile";

export default class EntityFile extends ConfigurationFile {
    constructor(
        path: string,
        content: string = ''
    ) {
        super(path, content);
        
        if(!path.endsWith(".entity.yml")){
            throw new Error("Entity files must have a .entity.yml extension");
        }
    }

    getName(): string {
        const parts = this.path.split('/');
        const filename = parts[parts.length - 1];
        return filename.replace('.entity.yml', '');
    }

    getPath(): string {
        return this.path;
    }
}
