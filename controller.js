var dualShock = require('./dist/dualshock-controller/src/dualshock');


var controller = dualShock({
    config: "dualshock4-generic-driver"
});
controller.on('error', err => console.log(err));

function setExtras(obj){
    controller.setExtras(obj);
}
var connected = false;
controller.on('connected', () => {
    connected = true;
});
controller.on("disconnected", ()=>{
    connected = false;
})

function isConnected(){
    return connected;
}
//add event handlers:
// controller.on('left:move', data => console.log('left Moved: ' + data.x + ' | ' + data.y));

// controller.on('right:move', data => console.log('right Moved: ' + data.x + ' | ' + data.y));

// controller.on('square:press', () => console.log('square press'));

// controller.on('square:release', () => console.log('square release'));

//sixasis motion events:
//the object returned from each of the movement events is as follows:
//{
//    direction : values can be: 1 for right, forward and up. 2 for left, backwards and down.
//    value : values will be from 0 to 120 for directions right, forward and up and from 0 to -120 for left, backwards and down.
//}

function on(event, handler){
    controller.on(event, handler);
}

module.exports = {
    on,
    isConnected,
    setExtras
}
// controller.on('touchpad:x1:active', () => console.log('touchpad one finger active'));

// controller.on('touchpad:x2:active', () => console.log('touchpad two fingers active'));

// controller.on('touchpad:x2:inactive', () => console.log('touchpad back to single finger'));

// controller.on('touchpad:x1', data => console.log('touchpad x1:', data.x, data.y));

// controller.on('touchpad:x2', data => console.log('touchpad x2:', data.x, data.y));


// //right-left movement
// controller.on('rightLeft:motion', data => console.log(data));

// //forward-back movement
// controller.on('forwardBackward:motion', data => console.log(data));

// //up-down movement
// controller.on('upDown:motion', data => console.log(data));

// //controller status
// //as of version 0.6.2 you can get the battery %, if the controller is connected and if the controller is charging
// controller.on('battery:change', data => console.log(data));

// controller.on('connection:change', data => console.log(data));

// controller.on('charging:change', data => console.log(data));
