export default abstract class ConfigurationFile {

    public path: string;
    public content: string

    protected constructor(
        path: string,
        content: string
    ) {
        if(!path) {
            throw new Error('Path is required');
        }

        if (!path.endsWith('.yml') && !path.endsWith('.yaml')) {
            throw new Error('File must have a .yml or .yaml extension');
        }

        this.path = path;
        this.content = content;
    }

    abstract getName(): string;

    abstract getPath(): string;
}
