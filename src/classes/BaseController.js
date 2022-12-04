class BaseController {

    constructor(target) {
        this.target = target;
        this.sprite = target.sprite;
        this.stats = target.stats;
    }

    addUpdateFn(key, fn) {
        this.target.addUpdateFn(key, fn);
    }

    addUpdateFnAndBindToSprite(key, fn) {
        let boundFn = fn.bind(this.sprite);
        this.target.addUpdateFn(key, boundFn);
    }

    addUpdaterBindSprite(fn) {
        this.target.addUpdater(fn.bind(this.sprite));
    }
}
export default BaseController;