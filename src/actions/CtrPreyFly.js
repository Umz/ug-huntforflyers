import Action from "classes/Action";
import FnNames from "consts/FnNames";
import WorldConsts from "consts/WorldConsts";

class CtrPreyFly extends Action {

    constructor(sprite) {
        super(FnNames.ACT_PREY_FLY);
        this.sprite = sprite;
    }

    subclassUpdate(time, delta) {

        const VARIATION = Phaser.Math.Between(-10, 10);
        const LIFT = 250;
        const FALL = 20;

        if (this.sprite.velocityY > FALL)
            this.sprite.setAccelerationY(-(LIFT + VARIATION))
        if (this.sprite.y < WorldConsts.FLYING_HEIGHT_MID_Y + VARIATION)
            this.sprite.setAccelerationY(0);
    }
}
export default CtrPreyFly;