import Action from "classes/Action";
import Actions from "consts/Actions";

class CtrCarryRocket extends Action {

    constructor(sprite, rocket) {
        super(Actions.ACT_CARRY_ROCKET);
        this.sprite = sprite;
        this.rocket = rocket;
    }

    subclassUpdate(time, delta) {
        let pos = this.sprite.getBottomCenter();
        this.rocket.setPosition(pos.x, pos.y);
        this.rocket.setVelocityY(0);
    }
}
export default CtrCarryRocket;