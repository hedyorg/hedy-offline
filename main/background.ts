import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
const { exec } = require("child_process");
const fs = require("fs");
const isProd: boolean = process.env.NODE_ENV === "production";

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
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

ipcMain.handle("has-python3", async () => {
  return new Promise((resolve, reject) => {
    exec("python3 --version", (error) => {
      if (error) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
});

ipcMain.handle("has-venv", async () => {
  if (fs.existsSync("./venv")) {
    return true;
  }
  return false;
});

ipcMain.handle("create-venv", async () => {
  return new Promise((resolve, reject) => {
    exec(
      "python3 -m venv venv && source venv/bin/activate && pip install -r ./hedy/requirements.txt",
      (error, stdout, stderr) => {
        if (error) {
          resolve(false);
          return;
        }
        resolve(true);
      }
    );
  });
});

ipcMain.handle("run-hedy-server", async () => {
  return new Promise((resolve, reject) => {
    exec(
      "source venv/bin/activate && cd ./hedy && python app.py",
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          resolve(false);
          return;
        }
        resolve(true);
      }
    );
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
