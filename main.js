const { dialog, Menu, app, BrowserWindow } = require('electron');
var files = require('./files');
var wifi = require('node-wifi');
let win;

wifi.init({
    iface : null
});
var wifiConnected, wifiQuality;
wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        console.log(err);
    }
    if(currentConnections.length > 0){
      wifiConnected = true;
      wifiQuality = currentConnections[0]['quality'];
      console.log(wifiQuality + '% wifi');
    } else {
      wifiConnected = false;
    }
})
var menu;
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false
    }
  })
  win.setTitle('Console hub (ALPHA) DEV');
  win.setProgressBar(1.1);
  win.setFullScreenable(true);
  var template = [{
    label: "Application",
    submenu: [{
        label: "About Application",
        selector: "orderFrontStandardAboutPanel:",
        click: function(){
          var options = {
            type: 'info',
            buttons: ['ok'],
            title: 'About app',
            message: 'Console hub (ALPHA) dev version.',
            detail: 'Nightly developer version, alpha stage. Accounts disabled.\n(c) Daniel Bulant',
          };
          dialog.showMessageBox(null, options, (response) => {

          });
        }
    }, {
        type: "separator"
    }, {
        label: "Quit",
        accelerator: "f4",
        click: function() {
            app.quit();
        }
    }, {
      label: 'Fullscreen',
      accelerator: "f11",
      click: function(){
        win.setFullScreen(!win.isFullScreen());
        if(win.isFullScreen()){
          win.setMenuBarVisibility(false)
        } else {
          win.setMenuBarVisibility(true)
        }
      }
    }]
}, {
    label: "Edit",
    submenu: [{
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        selector: "undo:"
    }, {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        selector: "redo:"
    }, {
        type: "separator"
    }, {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        selector: "cut:"
    }, {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        selector: "copy:"
    }, {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        selector: "paste:"
    }, {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:"
    }]
}, {
  label: 'Dev',
  submenu: [
    {
      label: 'Open devTools',
      accelerator: "CmdOrCtrl+Shift+I",
      click: function(){
         win.webContents.openDevTools()
      }
    }, {
      label: 'Refresh',
      accelerator: "CmdOrCtrl+R",
      click: function(){
        win.reload();
      }
    }
  ]
}];

  const menu = Menu.buildFromTemplate(template);
  win.setAutoHideMenuBar(true);
  Menu.setApplicationMenu(menu);
  win.loadFile('html/index.html')
  win.webContents.once('dom-ready', () => {
  //   win.webContents.openDevTools() //debug tools
    win.setProgressBar(0);
  })
  win.maximize();
  win.on('enter-full-screen', () => {
    console.log('Entered fullscreen');
    win.webContents.send('fullscreen', true);
    win.setMenuBarVisibility(false)
  })
  win.on('enter-full-html-screen', () => {
    console.log('Entered html fullscreen');
    win.webContents.send('fullscreen', true);
    win.setMenuBarVisibility(false)
  })
  win.on('leave-full-screen', () => {
    console.log('Leaved fullscreen');
    win.webContents.send('fullscreen', false);
    win.setMenuBarVisibility(true)
  })
  win.on('leave-full-html-screen', () => {
    console.log('Leaved html fullscreen');
    win.webContents.send('fullscreen', false);
    win.setMenuBarVisibility(true)
  })
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

const { ipcMain } = require('electron')
ipcMain.on('get-data', (event, arg) => {
  if(arg == 'wifi'){
    event.reply('wifi', wifiConnected);
  }
  if(arg == 'wifiQuality'){
    event.reply('wifiQuality', wifiQuality);
  }
})
ipcMain.on('set-load', (event, arg) => {
  win.setProgressBar(arg);
})
ipcMain.on('fullscreen', (event, arg) => {
  console.log('Setting to fullscreen ' + arg);
  win.setFullScreen(arg);
})
ipcMain.on('listFiles', (event, arg) => {
  console.log('Listing all files and directories in ' + arg);
  dirs = files.walkDir('my-dir', function(filePath) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    console.log(filePath, fileContents);
  });
  event.reply('listFiles', fileContents);
})
app.setAppUserModelId(process.execPath)

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
