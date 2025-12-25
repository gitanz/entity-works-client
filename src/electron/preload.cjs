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
      add: (workspacePath, fileName) => ipcRenderer.invoke('configuration.resources.add', workspacePath, fileName),
      rename: (workspacePath, fileName, newFileName) => ipcRenderer.invoke('configuration.resources.rename', workspacePath, fileName, newFileName)
    },
    
    entities: {
      create: () => ipcRenderer.invoke('configuration.entities.create'),
      index: (workspacePath) => ipcRenderer.invoke('configuration.entities.index', workspacePath),
      add: (workspacePath, fileName) => ipcRenderer.invoke('configuration.entities.add', workspacePath, fileName),
      rename: (workspacePath, fileName, newFileName) => ipcRenderer.invoke('configuration.entities.rename', workspacePath, fileName, newFileName)
    }
  },
});
