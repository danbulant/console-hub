//Only to be used for PS4 (Dualshock 4) controllers
var dualShock = require('../../dist/dualshock-controller/src/dualshock');
try {

    var controller = dualShock({
        config: "dualshock4-generic-driver"
    });

    controller.on('error', err => console.log(err));

    function setExtras(obj) {
        controller.setExtras(obj);
    }
    var connected = false;

    controller.on('connected', () => {
        connected = true;
    });
    controller.on("disconnected", () => {
        connected = false;
    })

    function isConnected() {
        return connected;
    }

    function on(event, handler) {
        controller.on(event, handler);
    }
    module.exports = {
        on,
        isConnected,
        setExtras
    }
} catch (e) {
    console.error(e);
    module.exports = {
        isConnected: ()=>{return false}
    }
}
