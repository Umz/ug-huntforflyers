import ViewDirection from "actions/ViewDirection";
import BaseController from "classes/BaseController";

class ThiefView extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.addDirectionTracking();
        this.playFlyingAnimation();
    }

    addDirectionTracking() {
        this.addActionNew(new ViewDirection(this.spriteNew));
    }

    playFlyingAnimation() {
        let model = this.spriteNew.model;
        this.spriteNew.anims.play(model.idle, true);
    }
}
export default ThiefView;