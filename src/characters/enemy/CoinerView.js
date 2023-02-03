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
        this.addAction(new ViewDirection(this.sprite));
    }

    playAnimation() {
        this.addAction(new ViewRunStop(this.sprite));
    }
}
export default CoinerView;