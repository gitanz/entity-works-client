import { dialog } from 'electron';
import path from 'path';
import fs from 'fs/promises';

export default class ProjectHandlers {

    async createProject() {
        const selection = await dialog.showOpenDialog({
                title: 'Select Workspace Directory',
                buttonLabel: 'Select Workspace',
                properties: ['openDirectory', 'showHiddenFiles', 'createDirectory']
            })
        
            if (!selection.filePaths.length) {
                return null;
            }
        
            const selectedPath = selection.filePaths[0];
        
            const selectedDir = (await fs.readdir(selectedPath)).filter((file) => !['.DS_Store', '.entity_works'].includes(file));
        
            if (!selectedDir) {
                return;
            }
        
            if (selectedDir.length) {
                await this.showWarningMessage('The selected directory is not empty. Please select an empty directory to create a new workspace.');
                return;
            }
            
            await fs.writeFile(path.join(selectedPath, '.entity_works'), JSON.stringify({}));
        
            return selectedPath;
    }

    async openProject() {
        const selection = await dialog.showOpenDialog({
            title: 'Select Workspace Directory',
            buttonLabel: 'Open Workspace',
            properties: ['openDirectory', 'showHiddenFiles']
        })

        if (!selection.filePaths.length) {
            return null;
        }

        const selectedPath = selection.filePaths[0];
        
        const selectedDir = (await fs.readdir(selectedPath)).some((file) => file === '.entity_works');

        if (!selectedDir) {
            await this.showWarningMessage("The selected directory is not a valid workspace.");
            return;
        }

        return selectedPath;
    }

    async showWarningMessage(message: string)
    {
        return await dialog.showMessageBox(
            {
                type: 'warning',
                buttons: ['OK'],
                message: message
            }
        );
    }
}
