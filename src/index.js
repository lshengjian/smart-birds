import bird from "../img/bird.png";
import pipetop from "../img/pipetop.png";
import pipebottom from "../img/pipebottom.png";
import background from "../img/background.png";

/*
best weights:
 [
     20.472346642378405, 5.839225200887583, -20.820639350622535,//node1
     -70.38086431444182, -8.947955242234235, -5.047430633043681, //node2
     -19.456205837813776, 42.25079106668653, -9.684767174551585//node3
];

*/



import Game from './Game';
let timeouts = [];
let messageName = "zero-timeout-message";

function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
}

function handleMessage(event) {
    if (event.source == window && event.data == messageName) {
        event.stopPropagation();
        if (timeouts.length > 0) {
            let fn = timeouts.shift();
            fn();
        }
    }
}

window.addEventListener("message", handleMessage, true);
window.setZeroTimeout = setZeroTimeout;
function run(imgs) {
    let game = new Game(imgs);
    game.start();
    game.update();
    game.display();
}

function loadImages(sources, callback) {
    let nb = 0;
    let loaded = 0;
    let imgs = {};
    for (let i in sources) {
        nb++;
        imgs[i] = new Image();
        imgs[i].src = sources[i];
        imgs[i].onload = function () {
            loaded++;
            if (loaded == nb) {
                console.log(nb + ' images are loaded!')
                callback(imgs);
            }
        }
    }
}
window.onload = () => {
    let sprites = {
        background,
        bird,
        pipetop,
        pipebottom
    };
    //console.log(sprites);
    loadImages(sprites, (imgs) => {
        run(imgs);
    });

}
