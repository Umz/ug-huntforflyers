import Action from "classes/Action";
import FnNames from "consts/FnNames";
import States from "consts/States";

class CtrSteal extends Action {
    constructor(sprite, target) {
        super(FnNames.ACT_ENEMY_STEAL);
        this.sprite = sprite;
        this.target = target;
    }

    subclassUpdate(time, delta) {

        this.sprite.setVelocity(0, -40);
        this.target.setPosition(this.sprite.x, this.sprite.getBottomCenter().y)

        if (this.target.y < -32) {
            this.target.destroy();
            this.sprite.setY(-16)
            this.setComplete();
        }
        else if (!this.target.parent.isStateEquals(States.STOLEN))
            this.setComplete();
    }
}
export default CtrSteal;