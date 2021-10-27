const {app, BrowserWindow} = require('electron')
const path = require("path");
const url = require("path");

let win;

function create() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,

  });


  win.loadFile(path.join(__dirname, 'dist/electron-ng-differential-equations/index.html'));
  win.removeMenu();
}

app.whenReady().then(create);
