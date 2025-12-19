// @ts-check

const {dialog} = require('electron');
const path = require('path');

const fs = require('fs').promises;

async function createProject()
{
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
        await showWarningMessage('The selected directory is not empty. Please select an empty directory to create a new workspace.');
        return;
    }
    
    await fs.writeFile(path.join(selectedPath, '.entity_works'), JSON.stringify({}));

    return selectedPath;
}

async function openProject()
{
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
        await showWarningMessage("The selected directory is not a valid workspace.");
        return;
    }

    return selectedPath;
}

async function showWarningMessage(message)
{
    return await dialog.showMessageBox(
        {
            type: 'warning',
            buttons: ['OK'],
            message: message
        }
    );
}

module.exports = { createProject, openProject };
