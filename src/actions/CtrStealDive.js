import Action from "../classes/Action";
import Actions from "consts/Actions";
import States from "../consts/States";
import WorldConsts from "../consts/WorldConsts";

class CtrStealDive extends Action {

    constructor(sprite, prey) {
        super(Actions.ACT_ENEMY_DIVE);
        this.sprite = sprite;
        this.prey = prey;

        this.sprite.setVelocity(0);
        this.sprite.setAcceleration(0, 100);
        this.sprite.setX(prey.x);
    }

    subclassUpdate(time, delta) {
        
        this.sprite.setX(this.prey.x);
        if (this.prey.y < this.sprite.y || this.sprite.y >= WorldConsts.GROUND_Y)
            this.sprite.setVelocity(0, -80);

        if (this.sprite.getBounds().contains(this.prey.x, this.prey.y)) {
            this.sprite.setVelocity(0, -32);
            this.setComplete();
        }

        if (this.prey.isState(States.DEAD))
            this.setComplete();
    }
}
export default CtrStealDive;