import Action from "classes/Action";
import Actions from "consts/Actions";
import States from "consts/States";

class CtrMoveToPrey extends Action {

    constructor(sprite, prey) {
        super(Actions.ACT_MOVE_TO_COLLECT);
        this.sprite = sprite;
        this.prey = prey;
    }

    subclassUpdate(time, delta) {

        let dir = this.prey.x > this.sprite.x ? 1 : -1;
        let vel = this.sprite.getSpeed() * dir;

        let dist = Math.abs(this.sprite.x - this.prey.x);
        if (dist > this.sprite.width * .25)
            this.sprite.setVelocityX(vel);
        else
            this.sprite.setVelocityX(this.sprite.velocityX * .9);

        if (this.sprite.getBounds().contains(this.prey.x, this.prey.y) || !this.prey.isState(States.FROZEN))
            this.setComplete();
    }
}
export default CtrMoveToPrey;