import Action from "classes/Action";
import Actions from "consts/Actions";
import States from "consts/States";

class CtrSteal extends Action {

    constructor(sprite, prey) {
        super(Actions.ACT_ENEMY_STEAL);

        this.sprite = sprite;
        this.prey = prey;
    }

    subclassUpdate(time, delta) {

        this.sprite.setVelocity(0, -40);

        this.prey.setPosition(this.sprite.x, this.sprite.getBottomCenter().y)
        this.prey.setState(States.STOLEN);

        if (this.prey.y < -32) {
            this.prey.kill();
            this.prey.destroy();
            
            this.sprite.setY(-16)
            this.setComplete();
        }
        else if (!this.prey.isState(States.STOLEN))
            this.setComplete();
    }
}
export default CtrSteal;