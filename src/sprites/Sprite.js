export default class Sprite {
    constructor(ctx,imgs) {
        this._ctx=ctx;
        this._imgs=imgs;
    }
    init(json) {
        for (let i in json) {
            this[i] = json[i];
        }
    }
};