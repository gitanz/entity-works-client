/** @type {import('electron')} */
const {app, BrowserWindow, screen, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const ProjectHandlers = require('./IPC/ProjectHandlers.cjs');
const ResourceHandlers = require('./IPC/ResourceHandlers.cjs');

const projectHandlers = new ProjectHandlers();
const resourceHandlers = new ResourceHandlers();

ipcMain.handle('welcome.createProject', async () => {
    return await projectHandlers.createProject();
});

ipcMain.handle('welcome.openProject', async () => {
    return await projectHandlers.openProject();
});

ipcMain.handle('configuration.resources.index', async (event, workspacePath) => {
    return await resourceHandlers.index(workspacePath);
});

ipcMain.handle('configuration.resources.add', async (event, {workspacePath, resourceName}) => {
    return await resourceHandlers.create(workspacePath, resourceName);
});

ipcMain.handle('configuration.resources.rename', async (event, {workspacePath, resourceName, newResourceName}) => {
    return await resourceHandlers.rename(workspacePath, resourceName, newResourceName);
});

app.on('ready', () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;
    const windowWidth = 850;
    const windowHeight = 1200;
    const mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 10, y: 10 },
        minWidth: 700,
        minHeight: 250,
        width: windowWidth,
        height: windowHeight,
        x: width - windowWidth,
        y: 0,
        ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
    mainWindow.webContents.once('devtools-opened', () => {
    mainWindow.webContents.devToolsWebContents.executeJavaScript(
        `window.UI && UI.inspectorView && UI.inspectorView.showPanel('console')`
    );
    });
    mainWindow.loadURL('http://localhost:5123');
})
