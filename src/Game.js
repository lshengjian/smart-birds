import Config from '../config';
import Bird from './sprites/Bird';
import Hole from './sprites/Hole';
import Optimizer from './core/PSO';

let game;
let FPS = 60;
let nbBirds = 30;
let maxScore = 0;
let holeOffset = 50;
let holeHeight = 120;
let images = {};

let speed = function (fps) {
    FPS = parseInt(fps);
}
let setFPS = function (e) {
    let ss = e.target.id;
    FPS = parseInt(ss.split('s')[1]);
}

export default class Game {
    constructor(imgs) {
        images = imgs;
        this.holes = [];
        this.birds = [];
        this.score = 0;
        this.canvas = document.querySelector("#flappy");//width='576' height='512'
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width = Config.SCREEN.width;
        this.height = this.canvas.height = Config.SCREEN.height;
        this.spawnInterval = 90;
        this.interval = 0;
        this.alives = 0;
        this.generation = 1;
        this.backgroundSpeed = 0.5;
        this.backgroundx = 0;
        this.maxScore = 0;
        this.printFlag = true;
        document.getElementById("s0").onclick = setFPS;
        document.getElementById("s60").onclick = setFPS;
        document.getElementById("s120").onclick = setFPS;
        document.getElementById("s180").onclick = setFPS;
        document.getElementById("s300").onclick = setFPS;

        this.birds = [];


        this.optimizer = new Optimizer();
        this.optimizer.setObjectiveFunction((x) => 0);
        let domain = { start: -10, end: 10 };
        this.optimizer.init(nbBirds, 9, domain);//(2+1)*2+(2+1)*1
        //this.optimizer.init(nbBirds, 11, domain);//(3+1)*2+(2+1)*1
        for (let i = 0; i < nbBirds; i++) {
            let b = new Bird(this.ctx, [images.bird]);
            b.agent = this.optimizer._particles[i];
            let data = b.brain.getDataCopy();
            data.weights = b.agent.getPosition();
            b.brain.loadData(data);
            this.birds.push(b)
        }
        //this.alives = this.birds.length;
    }
    start() {
        // console.log('Restart!')
        this.generation++;
        this.target = null;
        this.alives = this.birds.length;
        this.interval = 0;
        this.score = 0;
        this.holes = [];
        for (let b of this.birds) {
            b.reset({
                x: 80,
                y: 200 + 50 * Math.random(),
                alive: true,
                velocity: 0
            });
        }

    }
    update() {
        let self = this;
        if (FPS == 0) {
            setZeroTimeout(function () {
                self.update();
            });
        } else {
            setTimeout(function () {
                self.update();
            }, 1000 / FPS);
        }

        if (this.interval == 0) {
            let holeY = Math.round(Math.random() * (this.height - holeOffset * 2 - holeHeight)) + holeOffset;
            let h = new Hole(this.ctx, [images.pipetop, images.pipebottom]);
            h.reset({ x: this.width, y: holeY });
            this.holes.push(h);
            for (let h of this.holes) {
                if ((h.x + h.width / 2) > (this.birds[0].x + this.birds[0].width / 2)) {
                    this.target = h;
                    break;
                }
            }
        }

        this.interval++;
        if (this.interval == this.spawnInterval) {
            this.interval = 0;
        }

        this.backgroundx += this.backgroundSpeed;
        for (let i = 0; i < this.holes.length; i++) {
            this.holes[i].update();
            if (this.holes[i].isOut()) {
                this.holes.splice(i, 1);
                i--;
            }
        }

        for (let b of this.birds) {
            if (b.alive) {
                b.update(this.target);
                if (b.isDead(this.holes)) {
                    b.alive = false;
                    b.agent.fitness = this.score;
                    this.alives--;
                    if (this.isOver()) {
                        this.start();
                        return;
                    }
                }
            }
        }

        this.score++;
        this.maxScore = (this.score > this.maxScore) ? this.score : this.maxScore;
                
        if (this.printFlag && this.score > 200000) {
            for (let b of this.birds) {
                if (b.alive) {
                    let data = b.agent.getPosition();
                    console.log(data);
                    this.printFlag = false;
                    break;
                }
            }
        }
    }

    display() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < Math.ceil(this.width / images.background.width) + 1; i++) {
            this.ctx.drawImage(images.background, i * images.background.width - Math.floor(this.backgroundx % images.background.width), 0)
        }

        for (let h of this.holes) {
            h.display();
        }
        for (let b of this.birds) {
            if (b.alive)
                b.display();
        }
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px sans-serif";
        this.ctx.fillText("Score : " + this.score, 10, 25);
        this.ctx.fillText("Max Score : " + this.maxScore, 10, 50);
        this.ctx.fillText("Generation : " + this.generation, 10, 75);
        this.ctx.fillText("Alive : " + this.alives, 10, 100);

        let self = this;
        requestAnimationFrame(function () {
            self.display();
        });
    }
    isOver() {
        for (let b of this.birds) {
            if (b.alive) {
                return false;
            }
        }
        this.optimizer.step();
        for (let i = 0; i < nbBirds; i++) {
            let b = this.birds[i];
            let data = b.brain.getDataCopy();
            data.weights = b.agent.getPosition();
            // console.log(data);
            b.brain.loadData(data);
        }
        return true;
    }

} 