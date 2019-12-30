// In renderer process (web page).
const { ipcRenderer } = require('electron')

var wifi, wifiQuality;

ipcRenderer.on('wifi', (event, arg) => {
  wifi = arg;
  wifi = wifi;
});

ipcRenderer.on('wifiQuality', (event, arg) => {
  wifiQuality = arg;
  wifiQuality = wifiQuality;
});

ipcRenderer.on('fullscreen', (event, arg) => {
  console.log("Fullscreen now " + arg);
  settingMenuItemValues[0] = arg;
});

ipcRenderer.send('get-data', 'wifi');
ipcRenderer.send('get-data', 'wifiQuality');

function sendKeys(arg, arg2){
  ipcRenderer.send('sendKeys', arg, arg2);
  return true;
}
var loc = window.location.pathname;
var dir = loc.substring(1, loc.lastIndexOf('/'));
ipcRenderer.send('listFiles', dir);