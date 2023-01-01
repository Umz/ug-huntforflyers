import Action from "../classes/Action";
import FnNames from "../consts/FnNames";

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
            this.target.setVisible(false).setActive(false);
            this.sprite.setY(-16)
            this.setComplete();
        }
    }
}
export default CtrSteal;