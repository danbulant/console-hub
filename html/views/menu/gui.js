
function showTitle(title){
    var view = document.getElementById("view");
    var t = document.createElement("h1");
    t.classList.add("title--main")
    t.innerText = title;

    view.appendChild(t);
}

function showDescription(desc) {
    var view = document.getElementById("view");
    var t = document.createElement("h2");
    t.classList.add("title--description")
    t.innerText = desc;

    view.appendChild(t);
}

global.cards = [];
global.currentCard = -1;
function getCard(card){
    var t = document.createElement("div");
    var title = document.createElement("span");
    title.innerText = card.name;
    var image = document.createElement("img");
    image.src = card.image;
    global.cards[global.cards.length] = card;

    t.appendChild(title);
    t.appendChild(image);

    return t;
}

function renderCardList(cards){
    var view = document.getElementById("view");
    var list = document.createElement("div");

    view.appendChild(list);

    list.classList.add("cards-list");

    cards.forEach((card, i)=>{
        var c = document.createElement("div");
        c.classList.add("card");
        
        var img = document.createElement("img");
        img.src = card.image;
        c.appendChild(img);
        
        var text = document.createElement("span");
        text.innerText = card.name;
        c.appendChild(text);

        var action = document.createElement("p");
        action.innerText = card.action;
        c.appendChild(action);

        list.appendChild(c);
    });
}

function showAction(action, side){

}
module.exports = {
    showTitle,
    showDescription,
    getCard,
    renderCardList,
    showAction
}