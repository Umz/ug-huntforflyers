import Action from "../classes/Action";
import Actions from "consts/Actions";

class CtrMoveToX extends Action {

    constructor(sprite, toX) {
        super(Actions.ACT_MOVE_TO_X);

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
export default CtrMoveToX;