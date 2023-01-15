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
        this.addActionNew(new ViewDirection(this.spriteNew));
    }

    addAnimationListener() {
        this.addActionNew(new ViewRunIdle(this.spriteNew));
    }
}
export default CivilianView;