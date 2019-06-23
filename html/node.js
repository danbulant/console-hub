if(typeof require() != undefined){
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
} else {
  //no NODE integration, propably browser access
}
