class BaseController {

    constructor(target) {
        this.target = target;
        this.sprite = target.sprite;
        this.stats = target.stats;
    }

    addUpdaterBindSprite(fn) {
        this.target.addUpdater(fn.bind(this.sprite));
    }
}
export default BaseController;