import BaseController from "../classes/BaseController";
import Animations from "../consts/Animations";

class CollectorView extends BaseController {
    constructor(target) {
        super(target);
        this.model = target.model;
        this.playIdleAnimation();
    }

    playIdleAnimation() {
        this.sprite.anims.play(this.model.idle);
    }
}
export default CollectorView;