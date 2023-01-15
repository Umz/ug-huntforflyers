import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewRunStop from "actions/ViewRunStop";

class CoinerView extends BaseController {

    constructor(target) {
        super(target);
        this.addDirectionTracking();
        this.playAnimation();
    }

    addDirectionTracking() {
        this.addActionNew(new ViewDirection(this.spriteNew));
    }

    playAnimation() {
        this.addActionNew(new ViewRunStop(this.spriteNew));
    }
}
export default CoinerView;