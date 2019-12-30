/**
 * (C) Daniel Bulant
 * This file IS NOT subject to the LICENSE.
 * Permission is hereby granted by Daniel Bulant to be used exclusively in console-hub (unless otherwise stated).
 * Want to use this script? Contact me at admin@danbulant.eu
 */

class EventEmitter {
    constructor() {
        var delegate = document.createDocumentFragment();
        [
            'addEventListener',
            'dispatchEvent',
            'removeEventListener'
        ].forEach(f =>
            this[f] = (...xs) => delegate[f](...xs)
        )
    }
}

class Controls extends EventEmitter {
    players = [];
    binds = {};
    gamepads = 0;
    gamepadArray = {};
    axisMinimum = 0.7;
    constructor() {
        super();
        this.isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

        //Gamepad support
        if (!this.hasGamepads()) {
            console.log("Gamepads not supported!");
        } else {
            this.initGamepads();
        }

        var player = this.addPlayer();
        console.log("(DEFAULT) Player joined using Keyboard");

        player.controlledBy = {
            type: "keyboard",
            id: 1
        }

        this.defaultBindings(player, "KEY1");

        var interval = setInterval(this.update, 1000 / 60, this, this.binds);//update the properties at 60FPS

        this.listenForKeys();
    }

    listenForKeys() {
        this.keys = {};
        window.onkeyup = e => { this.keys[e.key] = false; if (e.key == "Tab") { e.preventDefault() } }
        window.onkeydown = e => { this.keys[e.key] = true; if (e.key == "Tab") { e.preventDefault() } }
    }

    update(controls, bindings) {
        controls.players.forEach((player) => {
            var gamepad = {};
            if (player.controlledBy.type == "controller") {
                gamepad = navigator.getGamepads()[player.controlledBy.id];
            }
            var binds = bindings[player.id];
            for (var bind in binds) {
                if (!binds.hasOwnProperty(bind)) continue;
                var isPressed = controls.checkPressed(binds[bind], gamepad);
                if (isPressed && isPressed != player[bind + "Pressed"]) {
                    var event = new Event(player.id + "-" + bind);
                    event.player = player;
                    event.bindings = binds;
                    controls.dispatchEvent(event);
                }
                if (isPressed) {
                    var event = new Event("while_" + player.id + "-" + bind);
                    event.player = player;
                    event.bindings = binds;
                    controls.dispatchEvent(event);
                }
                player[bind + "Pressed"] = isPressed;
            }
        });
    }
    while(player, event, callback) {
        return this.addEventListener("while_" + player + "-" + event, callback);
    }
    on(player, event, callback) {
        return this.addEventListener(player + "-" + event, callback);
    }
    once(player, event, callback) {
        var controls = this;
        return this.addEventListener(player + "-" + event, function cb(e) {
            controls.removeEventListener(e.type, cb);
            callback(e);
        });
    }
    checkPressed(str, gamepad) {
        var bind = this.parseBind(str);
        if (bind.type == "button") {
            return gamepad.buttons[bind.value].pressed;
        }
        if (bind.type == "key") {
            return this.keys[bind.value] == true;
        }
        if (bind.type == "unknown") {
            return null;
        }
        if (bind.type == "axis") {
            var value = gamepad.axes[bind.value];
            if (bind.axis == "+") {
                return value > this.axisMinimum;
            } else if (bind.axis == "-") {
                return value < -this.axisMinimum;
            }
        }
        return null;
    }
    parseBind(str) {
        var bind = {};
        if (str.substr(0, 1) == "b") {
            bind.type = "button";
        } else if (str.substr(0, 1) == "a") {
            bind.type = "axis";
        } else if (str.substr(0, 1) == "k") {
            bind.type = "key";
            str = str.substr(1);//remove the -
        } else {
            bind.type = "unknown";
        }

        str = str.substr(1);
        if (bind.type == "axis") {
            bind.axis = str.substr(str.length - 1);
            str = str.substr(0, str.length - 1);
        } else {
            bind.axis = null;
        }
        bind.value = str;
        return bind;
    }
    initGamepads() {
        var controls = this;
        window.addEventListener("gamepadconnected", function (e) {
            console.log("Player joined using %s", e.gamepad.id);
            controls.gamepads++;
            controls.gamepadArray[e.gamepad.index] = e.gamepad;
            var player = controls.addPlayer();


            player.controlledBy = {
                type: "controller",
                id: e.gamepad.index
            }

            controls.defaultBindings(player, "DS4");
        });

        window.addEventListener("gamepaddisconnected", function (e) {
            console.log("Player %d disconnected", e.gamepad.index);
            controls.gamepads--;
            controls.gamepadArray[e.gamepad.index] = undefined;

            controls.removeBindings()
        });
    }

    defaultBindings(player, type) {
        var binding = {};
        switch (type) {
            case "DS4":
                binding = {
                    home: "b16",
                    action: "b0",
                    jump: "b1",
                    forward: "a1-",
                    backward: "a1+",
                    left: "a0-",
                    right: "a0+",
                    options: "b9"
                }
                break;
            case "KEY1":
                binding = {
                    home: "k-Tab",
                    action: "k-Enter",
                    jump: "k- ",
                    forward: "k-w",
                    backward: "k-s",
                    left: "k-a",
                    right: "k-d",
                    options: "k-Escape"
                }
                break;
        }
        this.binds[player.id] = binding
    }
    /**
     * Try vibrating
     * @param {*} player player which controller is to be vibrated
     * @param {*} length ms to vibrate
     * @param {*} weak percents to vibrate
     * @param {*} strong percents to vibrate
     * @returns {Boolean} if vibration was possible (is supported)
     */
    vibrate(player, length = 200, weak = 100, strong = 100) {
        try {
            if (player.controlledBy.type == "controller") {
                navigator.getGamepads()[player.controlledBy.id].vibrationActuator.playEffect("dual-rumble", {
                    startDelay: 0,
                    duration: length,
                    weakMagnitude: weak / 100,
                    strongMagnitude: strong / 100
                });
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    /**
     * DEBUG
     */
    reportOnGamepad() {
        var gp = navigator.getGamepads()[0];
        var html = "";
        html += "id: " + gp.id + "<br/>";

        for (var i = 0; i < gp.buttons.length; i++) {
            html += "Button " + (i + 1) + ": ";
            if (gp.buttons[i].pressed) html += " pressed";
            html += "<br/>";
        }

        for (var i = 0; i < gp.axes.length; i += 2) {
            html += "Stick " + (Math.ceil(i / 2) + 1) + ": " + gp.axes[i] + ", " + gp.axes[i + 1] + "<br/>";
        }

        document.getElementById("gamepadDisplay").innerHTML = html;
    }
    hasGamepads() {
        return "getGamepads" in navigator;
    }

    playerCount() {
        return this.players.length;
    }
    addPlayer() {
        var player = this.players[this.players.length] = {};
        player.id = this.players.length;
        player.forwardPressed = false;
        player.backwardPressed = false;
        player.rightPressed = false;
        player.leftPressed = false;
        player.jumpPressed = false;
        player.actionPressed = false;
        player.homePressed = false;
        player.optionsPressed = false;
        player.controlledBy = null;

        return player;
    }
    addBinding(player, key, action) {
        if (!this.binds[player]) this.binds[player] = {};
        if (!this.binds[player][key]) this.binds[player][key] = [];
        this.binds[player][key][this.binds[player][key].length] = action;

        return this;//chaining
    }
    removeBinding(player, key, action = null) {
        if (action = null) {
            this.binds[player][key] = [];
        } else {
            this.removeItem(this.binds[player][key], action);
        }

        return this;
    }
    removeBindings(player) {
        this.binds[player] = {};
    }
    removeItem(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
}