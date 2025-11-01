import {app, BrowserWindow} from 'electron';
import path from 'path';
import {isDev} from './util.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 10, y: 10 },
        minWidth: 700,
        minHeight: 250,
        ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})

    });
    if(isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'))
    }
})
