import WorldConsts from "../consts/WorldConsts";

class BaseController {

    constructor(target) {
        this.target = target;
        this.sprite = target.sprite;
        this.stats = target.stats;
    }

    addAction(action) {
        this.target.addUpdateFn(action.name, action);
    }

    addUpdateFn(key, fn) {
        let boundFn = fn.bind(this);
        this.target.addUpdateFn(key, boundFn);
    }

    addUpdateFnAndBindToSprite(key, fn) {
        let boundFn = fn.bind(this.sprite);
        this.target.addUpdateFn(key, boundFn);
    }

    addUpdateFnAndBindToTarget(key, fn) {
        let boundFn = fn.bind(this.target);
        this.target.addUpdateFn(key, boundFn);
    }

    get velocityX() { return WorldConsts.BASE_MOVE_SPEED * this.stats.relativeSpeed }
}
export default BaseController;