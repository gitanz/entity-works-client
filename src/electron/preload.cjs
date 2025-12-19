const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
  welcome: {
    createProject: () => ipcRenderer.invoke('welcome.createProject'),
    openProject: () => ipcRenderer.invoke('welcome.openProject')
  }
});
