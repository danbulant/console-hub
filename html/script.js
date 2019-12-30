var gamepads = 0;

const gamepad = new Gamepad();
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
function pad(num, size){ return ('00000000000000' + num).substr(-size); }

setInterval((function(){
  today = new Date();
  time = pad(today.getHours(), 2) + ":" + pad(today.getMinutes(), 2);
  $("#time").html(time);
}), 1000);

gamepad.on('connect', e => {
  gamepads++;
  console.log(`controller ${e.index} connected!`);
});

gamepad.on('disconnect', e => {
  gamepads --;
  console.log(`controller ${e.index} disconnected!`);
});

gamepad.on('press', 'start', () => {
});

gamepad.on('press', 'd_pad_left', () => {
});
gamepad.on('press', 'd_pad_right', () => {
});
gamepad.on('press', 'button_1', () => {
});
gamepad.on('press', 'button_2', () => {
});

var leftCounter = 0;
var rightCounter = 0;
var remover;
function onAxis(){
  if(navigator.webkitGetGamepads) {
    if(navigator.webkitGetGamepads().length > 0){
      var gp = navigator.webkitGetGamepads()[0];
    } else {
      return;
    }
  } else if(navigator.getGamepads().length > 0) {
    var gp = navigator.getGamepads()[0];
  } else {
    return;
  }
  if(gp == null){
    return;
  }
  if(menuType == 'horizontal'){
    if(gp.axes[0] == 1){
      rightCounter++;
      console.log("Right axis (" + gp.axes[0] + ')');
    } else if(gp.axes[0] == -1){
      leftCounter++;
      console.log('Left axis (' + gp.axes[0] + ')');
    } else {
      leftCounter = 0;
      rightCounter = 0;
    }
  } else {
    if(gp.axes[1] == 1){
      rightCounter++;
      console.log("Top axis (" + gp.axes[1] + ')');
    } else if(gp.axes[1] == -1){
      leftCounter++;
      console.log('Bottom axis (' + gp.axes[1] + ')');
    } else {
      leftCounter = 0;
      rightCounter = 0;
    }
  }
  if(leftCounter == 1){
    goLeft();
    leftCounter = 2;
    remover = setTimeout((function(){rightCounter = 0; leftCounter = 0;}), 500);
  }
  if(rightCounter == 1){
    goRight();
    rightCounter = 2;
    remover = setTimeout((function(){rightCounter = 0; leftCounter = 0;}), 500);
  }
}
setInterval(onAxis, 100);
