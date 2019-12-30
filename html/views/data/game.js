class Game {
    name = "";
    image = "";
    run(){
        console.log("Game running");
        this.exit();
    }
    exit(){
        global.menu.show();
    }
}

module.exports = Game;