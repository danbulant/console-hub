if(typeof require !== typeof undefined){
  var wifi, wifiQuality;
  // In renderer process (web page).
  const { ipcRenderer } = require('electron')

  ipcRenderer.on('wifi', (event, arg) => {
    wifi = arg;
    wifi = wifi;
  })
  ipcRenderer.on('wifiQuality', (event, arg) => {
    wifiQuality = arg;
    wifiQuality = wifiQuality;
  })
  ipcRenderer.on('fullscreen', (event, arg) => {
    console.log("Fullscreen now " + arg);
    settingMenuItemValues[0] = arg;
  })
  function sendFullscreen(bool){
    console.log("Sending fullscreen " + bool);
    ipcRenderer.send('fullscreen', bool);
  }
  ipcRenderer.send('get-data', 'wifi');
  ipcRenderer.send('get-data', 'wifiQuality');
  var files = null;
  ipcRenderer.on('listFiles', (event, arg) => {
    console.log(arg);
    files = arg;
    refreshFiles();
  })
  function sendKeys(arg){
    ipcRenderer.send('sendKeys', arg);
    return true;
  }
  var loc = window.location.pathname;
  var dir = loc.substring(1, loc.lastIndexOf('/'));//fix file:///, only on node
  ipcRenderer.send('listFiles', dir);
} else {
  //no NODE integration, propably browser access
  function sendKeys(arg){
    return false;
  }
  toast('Missing node - features may not be available');
  $("div:has(#files)").hide();//Disable file system preview
  mainMenuItems.slice("files");
}
