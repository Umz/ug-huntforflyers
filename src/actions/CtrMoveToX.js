import Action from "../classes/Action";
import FnNames from "../consts/FnNames";

class CtrMoveTox extends Action {

    constructor(sprite, toX) {
        super(FnNames.ACT_MOVE_TO_X);

        this.toX = toX;
        this.sprite = sprite;
    }

    subclassUpdate(time, delta) {
        
        let dir = this.toX > this.sprite.x ? 1 : -1;
        let vel = this.sprite.getSpeed() * dir;
        this.sprite.setVelocityX(vel);

        if (this.sprite.getBounds().contains(this.toX, this.sprite.y))
            this.setComplete();
    }
}
export default CtrMoveTox;