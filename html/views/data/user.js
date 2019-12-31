const Card = require("./card");

class User {
    name = [];
    username = "";
    friends = [];
    avatar = "";
    achievments = {};

    getCard(){
        var card = new Card;
        card.name = this.name;
        card.image = this.avatar;
        card.action = false;

        return card;
    }
}

module.exports = User;