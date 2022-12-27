import Action from "../classes/Action";
import FnNames from "../consts/FnNames";
import WorldConsts from "../consts/WorldConsts";

class CtrMoveTox extends Action {
    constructor(base, targetX) {
        super(FnNames.ACT_MOVETOX);

        this.toX = targetX;
        this.sprite = base.getSprite();
        this.velocityX = base.stats.relativeSpeed * WorldConsts.BASE_MOVE_SPEED;
    }

    subclassUpdate(time, delta) {
        
        let dir = this.toX > this.sprite.x ? 1 : -1;
        let vel = this.velocityX * dir;
        this.sprite.setVelocityX(vel);

        if (this.sprite.getBounds().contains(this.toX, this.sprite.y))
            this.setComplete();
    }
}
export default CtrMoveTox;