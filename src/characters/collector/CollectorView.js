import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewCollectorAnim from "actions/ViewCollectorAnim";

class CollectorView extends BaseController {

    constructor(target) {
        super(target);
        this.addDirectionTracking();
        this.addAnimations();
    }

    addDirectionTracking() {
        this.addActionNew(new ViewDirection(this.spriteNew));
    }

    addAnimations() {
        this.addActionNew(new ViewCollectorAnim(this.spriteNew));
    }
}
export default CollectorView;