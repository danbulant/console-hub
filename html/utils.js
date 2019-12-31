const User = require("./views/data/user");
const Card = require("./views/data/card");

function removeChildNodes(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function getUsers() {
    var user = new User;
    user.name = "Add";
    user.avatar = "../../dist/icons/plus.png";

    var user2 = new User;
    user2.name = "Test";
    user2.avatar = "https://api.adorable.io/avatars/285/test";

    return [user, user2];
}

function usersToCards(users){
    var cards = [];
    users.forEach((u, i)=>{
        cards[i] = u.getCard();
    })
    return cards;
}
module.exports = {
    removeChildNodes,
    getUsers,
    usersToCards
}