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
        this.addAction(new ViewDirection(this.sprite));
    }

    addAnimations() {
        this.addAction(new ViewCollectorAnim(this.sprite));
    }
}
export default CollectorView;