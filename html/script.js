var start = true;
var screen = 0;
var menu = 0;
var gamepads = 0;

const gamepad = new Gamepad();
var toastCancel;
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
function pad(num, size){ return ('00000000000000' + num).substr(-size); }

setInterval((function(){
  today = new Date();
  time = pad(today.getHours(), 2) + ":" + pad(today.getMinutes(), 2);
  $("#time").html(time);
}), 1000);

function toast(string) {
  clearTimeout(toastCancel);
  var x = document.getElementById("snackbar");

  x.className = "show";
  x.innerHTML = string;
  toastCancel = setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function showWelcomeText(){
  var x = document.getElementById("welcome-continue");
  if(gamepads > 0){
    x.innerHTML = "Press <b>START</b> to procceed";
  } else {
    x.innerHTML = "Connect your gamepad!";
  }
}
function showMainMenu(){
  window.start = false;
  window.screen = 1;
  window.menu = 1;
  goRight();
  goLeft();

  $(".game").width((function(offset, width){
    return $(".game .game-preview:eq(" + offset + ")").width();
  }));

  $("#main-menu").removeClass('hidden');
  $("#selection").removeClass("hidden");
  $(".welcome-main").addClass("hide");
  setTimeout(1000, (function(){$(".welcome-main").hide();}));
}
function showStartMenu(){
  window.start = true;
  window.screen = 0;
  window.menu = 0;
  $("#main-menu").addClass('hidden');
  $("#selection").addClass("hidden");
  $(".welcome-main").removeClass("hide");
  $(".welcome-main").show();
}
gamepad.on('connect', e => {
  gamepads++;
  showWelcomeText();
  toast(`Player ${e.index + 1} has connected`);
  console.log(`controller ${e.index} connected!`);
});

gamepad.on('disconnect', e => {
  toast(`Player ${e.index + 1} has disconnected`);
  gamepads --;
  console.log(`controller ${e.index} disconnected!`);
});

gamepad.on('press', 'start', () => {
  showMainMenu();
});

gamepad.on('press', 'd_pad_left', () => {
  goLeft();
});
gamepad.on('press', 'd_pad_right', () => {
  goRight();
});
gamepad.on('press', 'button_1', () => {
  select();
});
gamepad.on('press', 'button_2', () => {
  deselect();
});
function goLeft(){
  if(menu == 1 || menu == 2 || menu == 3){
    selected--;
    callMenuItem();
  }
  console.log("Going left");
}
function goRight(){
  if(menu == 1 || menu == 2 || menu == 3){
    selected++;
    callMenuItem();
  }
  console.log("Going right");
}

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
