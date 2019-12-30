$(document).keypress((event) => {
  if(event.which == 39){//RIGHT
    if(menuType == 'horizontal'){
      goRight();
    }
  } else if(event.which == 40){//DOWN
    if(menuType != 'horizontal'){
      goRight();
    }
  } else if(event.which == 37){//LEFT
    if(menuType == 'horizontal'){
      goLeft();
    }
  } else if(event.which == 38){//UP
    if(menuType != 'horizontal'){
      goLeft();
    }
  } else if(event.which == 13){
    select();
    event.preventDefault();
  } else if(event.which == 27){
    deselect();
    event.preventDefault();
  }
})
var keyBinds = new Map();
keyBinds.set('button_1', 'enter')//set button_1 (A) as enter
var pressed = [];
var gameLooper = 0;
//Sending keys from gamepad
function changeToGame(){
  //Called when game is running
  //reset events
  gamepad.off('press', 'start');
  gamepad.off('press', 'd_pad_left');
  gamepad.off('press', 'd_pad_right');
  gamepad.off('press', 'button_1');
  gamepad.off('press', 'button_2');
  //add custom ones
  keyBinds.forEach((val, key) => {
    gamepad.on('press', key, () => {
      sendKeys([], val);
    })
  })

  // gameLooper = setInterval(() => {
  //   if(pressed == []) return;
  //   sendKeys(pressed);
  //   pressed = [];
  // }, 100);
}

function changeToMenu(){
  clearInterval(gameLooper); //stop sending keys
  //Called when game is stopped
  //reset events
  gamepad.off('press', 'start');
  gamepad.off('press', 'd_pad_left');
  gamepad.off('press', 'd_pad_right');
  gamepad.off('press', 'button_1');
  gamepad.off('press', 'button_2');
  //restore original events
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
}
