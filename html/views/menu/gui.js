
function showTitle(title) {
    var view = document.getElementById("view");
    var t = document.createElement("h1");
    t.classList.add("title--main");
    t.innerText = title;

    view.appendChild(t);
}

function showTitleInMiddle(title) {
    var view = document.getElementById("view");
    var t = document.createElement("h1");
    t.classList.add("title--main");
    t.classList.add("middle");
    t.innerText = title;

    view.appendChild(t);

    t.style.marginLeft = "-" + (t.offsetWidth / 2) + "px";
}

function showDescription(desc) {
    var view = document.getElementById("view");
    var t = document.createElement("h2");
    t.classList.add("title--description");
    t.innerText = desc;

    view.appendChild(t);
}
function showDescriptionInMiddle(desc) {
    var view = document.getElementById("view");
    var t = document.createElement("h2");
    t.classList.add("title--description");
    t.classList.add("middle");
    t.innerText = desc;

    view.appendChild(t);

    t.style.marginLeft = "-" + (t.offsetWidth / 2) + "px";
    t.style.marginTop = (document.querySelector(".title--main").offsetHeight) + "px";
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

function renderSelectedUserCard(selected, previous) {
    var prev = document.querySelectorAll(".user-cards-list .card")[previous];
    prev.classList.remove("selected");
    var card = document.querySelectorAll(".user-cards-list .card")[selected];
    card.classList.add("selected");
}

function renderUserCardList(cards){
    var view = document.getElementById("view");
    var list = document.createElement("div");

    view.appendChild(list);

    list.classList.add("user-cards-list");

    cards.forEach((card, i)=>{
        var c = document.createElement("div");
        c.classList.add("card");

        var img = document.createElement("img");
        img.src = card.image;
        c.appendChild(img);
        
        var text = document.createElement("p");
        text.innerText = card.name;
        text.classList.add("name");
        c.appendChild(text);

        list.appendChild(c);
    });
    renderSelectedUserCard(0,0);
}

function showAction(action, side){

}
module.exports = {
    showTitle,
    showDescription,
    getCard,
    renderUserCardList,
    showAction,
    renderSelectedUserCard,
    showTitleInMiddle,
    showDescriptionInMiddle
}