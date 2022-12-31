import ViewDirection from "../actions/ViewDirection";
import BaseController from "../classes/BaseController";
import FnNames from "../consts/FnNames";

class ThiefView extends BaseController {
    constructor(target) {
        super(target);

        this.addDirectionTracking();
        this.addAnimationListener();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    addAnimationListener() {
        let model = this.target.model;
        this.sprite.anims.play(model.idle, true);
    }
}
export default ThiefView;