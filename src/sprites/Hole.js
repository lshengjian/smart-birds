import Config from '../../config';
import Sprite from './Sprite';
let defaultOptions = Config.HOLE;
export default class Hole extends Sprite {
    constructor(ctx, imgs) {
        super(ctx, imgs);
        this.init(defaultOptions);
    }
    reset(option = defaultOptions) {
        this.init(option);
    }
    getTopPipeHeight(sceenHeight) {
        return this.x
    }
    getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
    getTopPipeY() {
        return this.y - this._imgs[0].height;
    }
    getBottomPipeY() {
        return this.y + this.height;
    }
    getBottomPipeHeight(sceenHeight) {
        return sceenHeight - this.y - this.height;
    }
    update() {
        this.x -= this.speed;
    }
    display() {
        let ctx = this._ctx;
        ctx.drawImage(this._imgs[0], this.x, this.getTopPipeY(),
            this.width, this._imgs[0].height);
        ctx.drawImage(this._imgs[1], this.x, this.getBottomPipeY(),
            this.width, this._imgs[1].height);

    }
    isOut() {
        if (this.x + this.width < 0) {
            return true;
        }
    }

};