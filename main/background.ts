import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import detect from "detect-port";
import path from "path";
import { spawn } from "child_process";

const isProd: boolean = process.env.NODE_ENV === "production";

const resourcePath = isProd ? process.resourcesPath : path.join(__dirname, "..");

let port = 4444;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    height: 1000,
    width: 1000,
    minHeight: 800,
    minWidth: 800,
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./setup.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/setup`);
  }

  port = await detect(port);

  const hedyPath = path.join(resourcePath, "./hedy");
  const pythonPath = path.join(resourcePath, "./venv/bin/python");

  const child = spawn(`cd ${hedyPath} && PORT=${port} ${pythonPath} app.py`, {
    shell: true,
  });

  child.stdout.on("data", (data) => {
    console.log(`child stdout:\n${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`child stderr:\n${data}`);
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.handle("getPort", () => {
  return port;
});
