const User = require("./views/data/user");
const Card = require("./views/data/card");

function removeChildNodes(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function getUsers(){
    var user = new User;
    user.name = "Test";
    user.avatar = "https://api.adorable.io/avatars/285/test";

    return [user];
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