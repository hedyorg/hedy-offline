const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('info', {
  getPort: () => ipcRenderer.invoke('port'),
  getAdventures: () => ipcRenderer.invoke('adventures'),
})
