import type ConfigurationFile from "./ConfigurationFile.ts";

export default interface iConfigurationFilesRepository {
    all(configurationFilePath: string) : Promise<ConfigurationFile[]>;

    get(configurationFilePath: string) : Promise<ConfigurationFile>;

    save(configurationFile: ConfigurationFile): Promise<void>;

    delete(configurationFile: ConfigurationFile) : Promise<void>;

    rename(configurationFile: ConfigurationFile, newPath: string) : Promise<void>;
}
