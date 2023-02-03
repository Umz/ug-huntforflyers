import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewRunIdle from "actions/ViewRunIdle";

class CivilianView extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.addDirectionTracking();
        this.addAnimationListener();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    addAnimationListener() {
        this.addAction(new ViewRunIdle(this.sprite));
    }
}
export default CivilianView;