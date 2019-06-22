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
