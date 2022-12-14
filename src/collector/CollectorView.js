import BaseController from "../classes/BaseController";
import Animations from "../consts/Animations";
import FnNames from "../consts/FnNames";

class CollectorView extends BaseController {
    constructor(target) {
        super(target);
        this.model = target.model;
        this.addAnimationListener();
        this.addDirectionTracking();
    }

    addDirectionTracking() {
        this.addUpdateFnAndBindToSprite(FnNames.VIEW_DIRECTION_FACING, function(time, delta) {
            let flipX = (this.body.velocity.x < 0);
            this.setFlipX(flipX);
        });
    }

    addAnimationListener() {
        const run = this.model.run;
        const idle = this.model.idle;
        this.addUpdateFnAndBindToSprite(FnNames.VIEw_COLLECTOR_FRAME, function() {
            // Check state - carrying or not -
            let velX = Math.abs(this.body.velocity.x);
            if (velX > 16)
                this.anims.play(run, true);
            else
                this.anims.play(idle, true);
        });
    }
}
export default CollectorView;