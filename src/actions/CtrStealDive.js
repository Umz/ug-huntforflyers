import Action from "../classes/Action";
import FnNames from "../consts/FnNames";
import States from "../consts/States";
import WorldConsts from "../consts/WorldConsts";

class CtrStealDive extends Action {

    constructor(sprite, target) {
        super(FnNames.ACT_ENEMY_DIVE);
        this.sprite = sprite;
        this.target = target;

        this.sprite.setVelocity(0);
        this.sprite.setAcceleration(0, 100);
        this.sprite.setX(target.x);
    }

    subclassUpdate(time, delta) {
        
        this.sprite.setX(this.target.x);
        if (this.target.y < this.sprite.y || this.sprite.y >= WorldConsts.GROUND_Y)
            this.sprite.setVelocity(0, -80);

        if (this.sprite.getBounds().contains(this.target.x, this.target.y)) {
            this.sprite.setVelocity(0, -32);
            this.setComplete();
        }

        if (this.target.parent.isStateEquals(States.DEAD))
            this.setComplete();
    }
}
export default CtrStealDive;