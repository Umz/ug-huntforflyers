import ViewDirection from "../actions/ViewDirection";
import BaseController from "../classes/BaseController";

class ThiefView extends BaseController {
    constructor(target) {
        super(target);
        this.addDirectionTracking();
        this.playFlyingAnimation();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    playFlyingAnimation() {
        let model = this.target.model;
        this.sprite.anims.play(model.idle, true);
    }
}
export default ThiefView;