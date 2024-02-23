const { app, BrowserWindow } = require("electron");
const url = require("url");
const { join } = require("path");

let mainWindow, serve;

const args = process.argv.slice(1);
serve = args.some((val) => val === "--serve");

if (serve) {
  require("electron-reload")(__dirname, {});
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    minWidth: 500,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: join(__dirname, `output/nvm-gui/browser/index.html`),
      protocol: "file:",
      slashes: true,
    }),
  );

  if (serve) {
    mainWindow.webContents.openDevTools();
    mainWindow.setAutoHideMenuBar(true);
  } else {
    mainWindow.setMenu(null);
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
