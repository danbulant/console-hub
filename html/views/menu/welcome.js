const utils = require("../../utils");
const gui = require("./gui");
const Gamepad = require("../../gamepad/gamepad");
const gamepad = new Gamepad;
const connected = require("./connected");

function welcome(){
    gui.showTitleInMiddle("Welcome to Console-hub");
    gui.showDescriptionInMiddle("Press home button to start");

    gamepad.on("press", "vendor", ()=>{
        gamepad.off('press', 'vendor');

        connected();
    });
}

module.exports = welcome;