const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const { ipcMain } = require('electron')
const detect = require('detect-port')
const process = require('process')
const spawn = require('child_process').spawn
const fs = require('fs')
const yaml = require('js-yaml')
const exec = require('child_process').exec

let port = 4444

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  const adventures = getHedyAdventures(['en', 'nl'])

  // Check if port is available and assigns a new one if not
  port = await detect(port)

  ipcMain.handle('port', () => port)
  ipcMain.handle('adventures', () => adventures)

  win.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/index.html')}`,
  )
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }

  const resourcePath = !isDev
    ? process.resourcesPath // Live Mode
    : __dirname // Dev Mode

  const hedyPath = path.join(resourcePath, '../hedy')

  const pythonPath = path.join(resourcePath, '../venv/bin/python')

  // Activate virtual environment and run hedy server
  var child = spawn(`cd ${hedyPath} && PORT=${port} ${pythonPath} app.py`, {
    shell: true,
  })

  child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`)
  })

  child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`)
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('quit', () => {
  exec(`kill -9 $(lsof -t -i:${port})`)
})

// Get all Hedy adventures stored in the yaml files of the hedy repo
const getHedyAdventures = (languages) => {
  const resourcePath = !isDev
    ? process.resourcesPath // Live Mode
    : __dirname // Dev Mode

  const adventuresPath = path.join(resourcePath, '../hedy/content/adventures')
  const fileNames = fs.readdirSync(adventuresPath)
  const adventureFiles = fileNames.filter((fileName) => languages.includes(fileName.split('.')[0]))
  const data = {}
  adventureFiles.forEach((fileName) => {
    const code = fileName.split('.')[0]
    const filePath = path.join(adventuresPath, fileName)
    const buffer = fs.readFileSync(filePath)
    const content = buffer.toString()
    const adventure = yaml.load(content)
    data[code] = adventure
  })

  return data
}
