const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
  welcome: {
    createProject: () => ipcRenderer.invoke('welcome.createProject'),
    openProject: () => ipcRenderer.invoke('welcome.openProject')
  },
  
  configuration: {
    resources: {
      create: () => ipcRenderer.invoke('configuration.resources.create'),
      index: (workspacePath) => ipcRenderer.invoke('configuration.resources.index', workspacePath),
      add: (workspacePath, resourceName) => ipcRenderer.invoke('configuration.resources.add', workspacePath, resourceName),
      rename: (workspacePath, resourceName, newResourceName) => ipcRenderer.invoke('configuration.resources.rename', workspacePath, resourceName, newResourceName)
    }
  }
});
