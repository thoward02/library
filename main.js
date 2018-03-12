//main.js -- The entry point for the Library Program
const electron = require('electron');
const app = electron.app;
const {ipcRenderer} = require('electron');
const {ipcMain} = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

var mainWindow = null

const createMainWindow = () => {
  mainWindow = new BrowserWindow({width: 1000, height: 700, frame: false})
  console.log("[-- Started --]");
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'main.html'), //Our main page where we're gonna load data etc etc
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', () => {
    mainWindow = null
  });
}
ipcMain.on('loadLesson()', (event, topic, lesson) => {
  var paths = "/lessons/"+topic+'/'+lesson+'/'+'main.html'
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname , paths), //Our main page where we're gonna load lessons
    protocol: 'file:',
    slashes: true
  }));
});

ipcMain.on('main()', (event) => {
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'main.html'), //Our main page where we're gonna load data etc etc
    protocol: 'file:',
    slashes: true
  }));
});
app.on('ready', createMainWindow);
app.on('window-all-closed', function(){
  if(process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', () => {
  if(mainWindow === null){
    createWindow()
  }
});
