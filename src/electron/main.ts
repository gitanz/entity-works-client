import {app, BrowserWindow, screen, ipcMain} from 'electron';
import path from 'path';
import ProjectHandlers from './IPC/ProjectHandlers';
import ResourceHandlers from './IPC/ResourceHandlers';
import EntityHandlers from './IPC/EntityHandlers';
import {fileURLToPath} from "url";

const projectHandlers = new ProjectHandlers();
const resourceHandlers = new ResourceHandlers();
const entityHandlers = new EntityHandlers();

const routes = {
    'welcome.createProject': projectHandlers.createProject,
    'welcome.openProject': projectHandlers.openProject,
    'configuration.resources.index': resourceHandlers.index,
    'configuration.resources.add': resourceHandlers.create,
    'configuration.resources.rename': resourceHandlers.rename,
    'configuration.resources.delete': resourceHandlers.delete,
    'configuration.entities.index': entityHandlers.index,
    'configuration.entities.add': entityHandlers.create,
    'configuration.entities.rename': entityHandlers.rename,
    'configuration.entities.delete': entityHandlers.delete,
};

for (const [channel, handler] of Object.entries(routes)) {
    ipcMain.handle(channel, async (_event, args) => {
        if (!args) {
            return await handler();
        }

        return await handler(args);
    });
}

app.on('ready', () => {
    const {width} = screen.getPrimaryDisplay().workAreaSize;
    const windowWidth = 850;
    const windowHeight = 1200;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
    mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.webContents.devToolsWebContents?.executeJavaScript(
            `window.UI && UI.inspectorView && UI.inspectorView.showPanel('console')`
        );
    });
    mainWindow.loadURL('http://localhost:5123');
})
