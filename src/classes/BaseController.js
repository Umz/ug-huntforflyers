class BaseController {

    constructor(target) {
        this.target = target;
        this.sprite = target.sprite;
        this.stats = target.stats;
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
}
export default BaseController;