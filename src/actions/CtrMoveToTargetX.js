import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrMoveToTargetX extends Action {

    constructor(sprite, target) {
        super(FnNames.ACT_MOVE_TO_TARGET_X);
        this.sprite = sprite;
        this.target = target;
    }

    subclassUpdate(time, delta) {

        let velX = this.sprite.getSpeed();
        let dir = this.target.x > this.sprite.x ? 1 : -1;
        let vel = velX * dir;

        let dist = Math.abs(this.sprite.x - this.target.x);
        if (dist > this.sprite.width * .25)
            this.sprite.setVelocityX(vel);
        else
            this.setComplete();
    }
}
export default CtrMoveToTargetX;