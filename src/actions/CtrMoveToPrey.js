import Action from "../classes/Action";
import FnNames from "../consts/FnNames";
import States from "../consts/States";
import WorldConsts from "../consts/WorldConsts";

class CtrMoveToPrey extends Action {

    constructor(sprite, target) {
        super(FnNames.ACT_MOVE_TO_COLLECT);
        this.sprite = sprite;
        this.target = target;
    }

    subclassUpdate(time, delta) {

        let velX = this.sprite.parent.calcVelocityX();
        let dir = this.target.x > this.sprite.x ? 1 : -1;
        let vel = velX * dir;

        let dist = Math.abs(this.sprite.x - this.target.x);
        if (dist > this.sprite.width * .25)
            this.sprite.setVelocityX(vel);
        else
            this.sprite.setVelocityX(this.sprite.body.velocity.x * .9);

        let prey = this.target.parent;
        if (this.sprite.getBounds().contains(this.target.x, this.target.y) || !prey.isStateEquals(States.FROZEN))
            this.setComplete();
    }
}
export default CtrMoveToPrey;