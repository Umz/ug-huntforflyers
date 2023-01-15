import Action from "classes/Action";
import Actions from "consts/Actions";
import States from "consts/States";

class CtrSteal extends Action {

    constructor(sprite, target) {
        super(Actions.ACT_ENEMY_STEAL);

        this.sprite = sprite;
        this.target = target;
    }

    subclassUpdate(time, delta) {

        this.sprite.setVelocity(0, -40);

        let prey = this.target.parent;
        prey.setPosition(this.sprite.x, this.sprite.getBottomCenter().y)
        prey.setState(States.STOLEN);

        if (this.target.y < -32) {
            this.target.destroy();
            this.sprite.setY(-16)
            this.setComplete();
        }
        else if (!prey.isStateEquals(States.STOLEN))
            this.setComplete();
    }
}
export default CtrSteal;