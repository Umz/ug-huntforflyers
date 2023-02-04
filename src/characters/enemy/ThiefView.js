import ViewDirection from "actions/ViewDirection";
import BaseController from "classes/BaseController";

class ThiefView extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.addDirectionTracking();
        this.playFlyingAnimation();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    playFlyingAnimation() {
        let model = this.sprite.model;
        this.sprite.anims.play(model.idle, true);
    }

    hit() {
        if (!this.sprite.isDead())
            this.sprite.flash(0xFFFFFF, 100);
    }
}
export default ThiefView;