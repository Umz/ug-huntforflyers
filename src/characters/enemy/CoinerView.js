import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewCoiner from "actions/ViewCoiner";

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
        this.addAction(new ViewCoiner(this.target));
    }
}
export default CoinerView;