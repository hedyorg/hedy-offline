import { spawn } from "child_process";
import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
const { exec } = require("child_process");
const isProd: boolean = process.env.NODE_ENV === "production";
const detect = require("detect-port");
import process from "process";
import path from "path";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      webSecurity: false, // This might be a security risk
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
  }

  // Port to run server on
  let port = 4444;

  // Check if port is available and assigns a new one if not
  port = await detect(port);

  const resourcePath =
    !process.env.NODE_ENV || process.env.NODE_ENV === "production"
      ? process.resourcesPath // Live Mode
      : __dirname; // Dev Mode

  const hedyPath = path.join(resourcePath, "../hedy");
  const pythonPath = path.join(resourcePath, "../venv/bin/python");

  // Activate virtual environment and run hedy server
  var child = spawn(`cd ${hedyPath} && PORT=${port} ${pythonPath} app.py`, {
    shell: true,
  });

  child.stdout.on("data", (data) => {
    console.log(`child stdout:\n${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`child stderr:\n${data}`);
  });

  // Kill server when app is closed
  mainWindow.on("closed", () => {
    exec(`kill -9 $(lsof -t -i:${port})`);
    app.quit();
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
