const utils = require("../../utils");
const gui = require("./gui");
const Gamepad = require("../../gamepad/gamepad");
const gamepad = new Gamepad;

function gamepadConnected(){
    console.log("Gamepad connected");

    var view = document.getElementById("view");
    utils.removeChildNodes(view);

    gui.showTitle("Your profile");
    gui.showDescription("Select or add your Pushr account to continue");

    const users = utils.getUsers();
    var max = users.length - 1;
    var cards = utils.usersToCards(users);
    gui.renderUserCardList(cards);
    var selected = 0;

    gamepad.on("press", "d_pad_right", () => {
        if(selected < max){
            selected++;
            gui.renderSelectedUserCard(selected, selected - 1);
        }
    });
    gamepad.on("press", "d_pad_left", () => {
        if (selected > 0){
            selected--;
            gui.renderSelectedUserCard(selected, selected + 1);
        }
    });
    gamepad.on("press", "stick_axis_left", e => {
        if(e.value[0] < -0.3){
            if (selected > 0){
                selected--;
                gui.renderSelectedUserCard(selected, selected + 1);
            }
        } else if (e.value[0] > 0.3) {
            if (selected < max) {
                selected++;
                gui.renderSelectedUserCard(selected, selected - 1);
            }
        }
    });

    gamepad.on("press", "button_1", () => {
        gamepad.off("press", "d_pad_left");
        gamepad.off("press", "d_pad_right");
        gamepad.off("press", "stick_axis_left");
        gamepad.off("press", "stick_axis_right");

        console.log("Loged in as ", users[selected]);
    });
}

module.exports = gamepadConnected;