import path from "path";
import type iWorkspaceRepository from "../../Domain/iWorkspaceRepository.ts";
import type iConfigurationFilesRepository from "../../Domain/Configuration/iConfigurationFilesRepository.ts";
import type { Application } from "../Application.ts";

export default class DeleteEntity implements Application<[string, string], void> {
    private workspaceRepository: iWorkspaceRepository;
    private entityRepository: iConfigurationFilesRepository;

    constructor(workspaceRepository: iWorkspaceRepository, entityRepository: iConfigurationFilesRepository) {
        this.workspaceRepository = workspaceRepository;
        this.entityRepository = entityRepository;
    }

  async execute(workspacePath: string, entityName: string): Promise<void> {
      const workspaceExists = await this.workspaceRepository.workspaceExists(workspacePath);
      if (!workspaceExists) {
          throw new Error('Workspace does not exist');
      }
      const entityPath = path.join(workspacePath, 'entities', entityName + '.entity.yml');
      const entity = await this.entityRepository.get(entityPath);

      await this.entityRepository.delete(entity);
  }
}
