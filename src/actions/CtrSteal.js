import Action from "../classes/Action";
import FnNames from "../consts/FnNames";

class CtrSteal extends Action {
    constructor(sprite, target) {
        super(FnNames.ACT_ENEMY_STEAL);
        this.sprite = sprite;
        this.target = target;

        this.mode = 1;
    }

    subclassUpdate(time, delta) {

        if (this.mode == 1) {
            if (this.sprite.getBounds().contains(this.target.x, this.target.y)) {
                this.sprite.setVelocity(0, -40);
                this.sprite.setAcceleration(0);
                this.mode = 2;
            }
        }

        else if (this.mode == 2) {
            this.sprite.setVelocity(0, -40);
            this.target.setPosition(this.sprite.x, this.sprite.getBottomCenter().y)
        }
    }
}
export default CtrSteal;