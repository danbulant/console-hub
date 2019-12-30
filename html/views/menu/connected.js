const utils = require("../../utils");
const gui = require("./gui");

function gamepadConnected(){
    console.log("Gamepad connected");

    var view = document.getElementById("view");
    utils.removeChildNodes(view);

    gui.showTitle("Your profile");
    gui.showDescription("Select or login with your Pushr account to continue");

    gui.renderCardList(utils.usersToCards(utils.getUsers()));
}

module.exports = gamepadConnected;