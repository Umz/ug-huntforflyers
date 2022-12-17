import BaseController from "../classes/BaseController";
import Animations from "../consts/Animations";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

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
        const carry = this.model.carry;
        const hold = this.model.hold;
        this.addUpdateFnAndBindToSprite(FnNames.VIEw_COLLECTOR_FRAME, function() {

            let moving = this.parent.isStateEquals(States.CARRYING) ?  carry : run;
            let still = this.parent.isStateEquals(States.CARRYING) ?  hold : idle;

            let velX = Math.abs(this.body.velocity.x);
            if (velX > 16)
                this.anims.play(moving, true);
            else
                this.anims.play(still, true);
        });
    }
}
export default CollectorView;