mainMenuItems = ['games', 'settings', 'account', 'store'];
gameMenuItems = ['slimey', 'test2'];
settingMenuItems = ['fullscreen', 'auto-update'];
settingMenuItemValues = [0,1];
selected = 1;
var menuType = 'horizontal';
var looper = 1;
function updateSettings(){
  looper = 1;
  settingMenuItems.forEach(function(name){
    $("#option-" + settingMenuItems[looper - 1] + " label input").prop( "checked", settingMenuItemValues[looper - 1]);
    looper++;
  })
  looper = 1;
}
setInterval(updateSettings, 400);
function select(){
  if(start == true){
    showMainMenu();
    return;
  }
  if(window.menu == 1){
    if(selected == 1){
      window.menu = 2;
      window.selected = 1;
      $(".button-main.selected").removeClass("selected");
      $(".button-main-container.selected").removeClass("selected");
      menuType = 'horizontal';
      selectGameMenuItem();
    } else if(selected == 2){
      window.selected = 1
      window.menu = 3;
      $(".button-main.selected").removeClass("selected");
      $(".button-main-container.selected").removeClass("selected");
      menuType = 'vertical';
      selectSettingMenuItem();
    }
  } else if(window.menu == 3) {
    $("#option-" + settingMenuItems[selected - 1] + " label input").prop( "checked", !$("#option-" + settingMenuItems[selected - 1] + " label input").prop( "checked") );
    settingMenuItemValues[selected - 1] = $("#option-" + settingMenuItems[selected - 1] + " label input").prop( "checked");
    if(settingMenuItems[selected - 1] == 'fullscreen'){
      sendFullscreen(settingMenuItemValues[selected - 1]);
    }
  } else if(window.menu == 2){
    if(selected == 1){
      $("#game-slimey .game-preview").css('transition', '0.5s width, 0.5s height, 0.5s max-height, 0.3s top, 0.3s left, 0.5s opacity');
      $("#game-slimey .game-preview").css('-webkit-transition', '0.5s width, 0.5s height, 0.5s max-height, 0.3s top, 0.3s left, 0.5s opacity');
      $("#game-slimey .game-preview").css('-moz-transition', '0.5s width, 0.5s height, 0.5s max-height, 0.3s top, 0.3s left, 0.5s opacity');
      $("#game-slimey .game-preview").width($(document).width());
      $("#game-slimey .game-preview").height("auto");
      var gamePosition = $("#game-slimey .game-preview").position();
      $("#game-slimey .game-preview").css("left", gamePosition.left);
      $("#game-slimey .game-preview").css("top", gamePosition.top);
      $("#game-slimey .game-preview").css("position", "fixed");
      $("#game-slimey .game-preview").css("z-index", "990");
      $("#game-slimey .game-preview").css("left", 0);
      $("#game-slimey .game-preview").css("top", 0);
      $("#game-slimey .game-preview").css("opacity", 0);
      setTimeout(() => {
        $("#game-slimey .game-preview").attr("style", '');
        $("#game-slimey .game-preview").hide();
        startGame(0);
      }, 500);
    }
  }
}
function deselect(){
  if(menu == 2 || menu == 3){
    $(".selected").removeClass("selected");
    switch(menu){
      case 2:
        window.selected = 1;
        break;
      case 3:
        window.selected = 2;
        break;
    }
    window.menu = 1;
    menuType = 'horizontal';
    selectMainMenuItem();
  } else if(menu == 1){
    showStartMenu();
  }
}
function callMenuItem(){
  switch(menu){
    case 1:
      selectMainMenuItem();
      break;
    case 2:
      selectGameMenuItem();
      break;
    case 3:
      selectSettingMenuItem();
      break;
  }
}
function selectSettingMenuItem(){
  if(selected > settingMenuItems.length){
    selected = 1;
  } else if(selected < 1){
    selected = settingMenuItems.length;
  }
  console.log("Selected item no. " + selected);
  $(".option.selected").removeClass("selected");
  $("#option-" + settingMenuItems[selected - 1]).addClass("selected");
}
function selectGameMenuItem(){
  if(selected > gameMenuItems.length){
    selected = 1;
  } else if(selected < 1){
    selected = gameMenuItems.length;
  }
  console.log("Selected item no. " + selected);
  $(".game.selected").removeClass("selected");
  $("#game-" + gameMenuItems[selected - 1]).addClass("selected");

  $(".game").width((function(offset, width){
    return $(".game .game-preview:eq(" + offset + ")").width();
  }));
}
function selectMainMenuItem(){
  if(selected > mainMenuItems.length){
    selected = 1;
  } else if(selected < 1){
    selected = mainMenuItems.length;
  }
  $(".menu-item").addClass("hidden");
  console.log("Selected item no. " + selected);
  $(".button-main.selected").removeClass("selected");
  $(".button-main-container.selected").removeClass("selected");
  $("#" + mainMenuItems[selected - 1]).addClass("selected");
  $("#" + mainMenuItems[selected - 1] + "-view").removeClass("hidden");
  $(".button-main-container:has(.selected)").addClass("selected");

  if(selected == 1){
    $(".game").width((function(offset, width){
      return $(".game .game-preview:eq(" + offset + ")").width();
    }));
  }
}
