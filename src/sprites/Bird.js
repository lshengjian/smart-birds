import Config from '../../config';
import Sprite from './Sprite';
import { Network } from '../core/Network';
import { Particle } from '../core/Particle';
let defaultOptions = Config.BIRD;
export default class Bird extends Sprite {
    constructor(ctx, imgs) {
        super(ctx, imgs);
        this.init(defaultOptions);
        this.brain = new Network(2, [2], 1);
    }
    shouldFlap(target) {
        let sreenWidth = Config.SCREEN.width;
        let sreenHeight = Config.SCREEN.height;
     
        let inputs = [
            (target.y + target.height / 2 - this.y - this.height / 2) / sreenHeight,
            (target.x + target.width / 2 - this.x - this.width / 2) / sreenWidth
        ];
        return this.brain.compute(inputs) >= 0.5;
    }
    reset(option = defaultOptions) {
        this.init(option);
    }
    flap() {
        this.velocity = this.jump;
    }
    display() {
        let ctx = this._ctx;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(Math.PI / 2 * this.velocity / 20);
        ctx.drawImage(this._imgs[0], -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
        //console.log('draw bird');
    }
    update(target) {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (target == null) {
            return false;
        }
        if (this.shouldFlap(target)) {
            this.flap();
        }
    }
    isDead(holes) {
        let sreenHeight = Config.SCREEN.height;

        if (this.y >= sreenHeight || this.y + this.height <= 0) {
            return true;
        }
        for (let h of holes){
            if ( this.x>h.x
                &&this.x<(h.x+h.width)
                &&(this.y<h.y||(this.y+this.height)>(h.y+h.height))
            )
                return true;
        }
 
        return false;
    }
};