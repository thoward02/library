//main.js -- The entry point for the Library Program
const electron = require('electron');
const app = electron.app;
const {ipcRenderer} = require('electron');
const {ipcMain} = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
var mainWindow = null
const createMainWindow = () => {
  mainWindow = new BrowserWindow({width: 1000, height: 705, frame: false, resizable: true, backgroundColor: '#1e3137' });
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'main.html'), //Our main page where we're gonna load data etc etc
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

function runCheck(){
  //checkForInternet
  mainWindow = new BrowserWindow({width: 500, height: 200, frame: false, resizable: false,backgroundColor: '#1e3137'})
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'loading.html'), //Our main page where we're gonna load data etc etc
    protocol: 'file:',
    slashes: true
  }))
}
ipcMain.on('loadLesson()', (event, topic, lesson) => {
  var paths = "/lessons/"+topic+'/'+lesson+'/'+'main.html'
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname , paths), //Our main page where we're gonna load lessons
    protocol: 'file:',
    slashes: true
  }));
});
ipcMain.on('loadMain()', function(){
  mainWindow.hide()
  mainWindow = null;
  createMainWindow();
})
ipcMain.on('main()', (event) => {
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'main.html'), //Our main page where we're gonna load data etc etc
    protocol: 'file:',
    slashes: true
  }));
});
//System Functions
ipcMain.on('exit()', (event) => {
  app.quit();
});
ipcMain.on('maximize()', (event) => {
  if(mainWindow.isMaximized()){mainWindow.unmaximize();}
  else{mainWindow.maximize();}
});
ipcMain.on('minimize()', (event) => {
  mainWindow.minimize();
});


app.on('ready', function(){
    runCheck();
  });
app.on('window-all-closed', function(){
  if(process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', () => {

  if(mainWindow === null){
    runCheck()
  }
});
