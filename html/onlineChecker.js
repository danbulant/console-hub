var wifi = true;
var wifiQuality = 100;
function updateIndicator() {
	if(navigator.onLine){
    if(wifiQuality > 75){
      $('.info i').html('signal_wifi_4_bar');
    } else if(wifiQuality > 50){
      $('.info i').html('signal_wifi_3_bar');
    } else if(wifiQuality > 25){
      $('.info i').html('signal_wifi_2_bar');
    } else if(wifiQuality > 10){
      $('.info i').html('signal_wifi_1_bar');
    } else {
      $('.info i').html('signal_wifi_0_bar');
    }
    console.log('Wifi quality is ' + wifiQuality + '%')
  } else {
    $('.info i').html('signal_wifi_off');
    console.log('offline');
  }
}

window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);
updateIndicator();
