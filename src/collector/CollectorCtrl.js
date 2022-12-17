import BaseController from "../classes/BaseController";
import FnNames from "../consts/FnNames";
import WorldConsts from "../consts/WorldConsts";

class CollectorCtrl extends BaseController {
    constructor(target) {
        super(target);
        this.addFollowTracked();
    }

    addFollowTracked() {
        const mul = Math.random() * 3 + .5;
        const velX = this.velocityX;
        this.addUpdateFnAndBindToTarget(FnNames.CTRL_FOLLOW_PLAYER, function() {
            if (this.getTrackedSprite()) {

                let x = this.sprite.x;
                let toX = this.getTrackedSprite().x;
                let dir = toX > x ? 1 : -1;
                let vel = velX * dir;

                let dist = Math.abs(x - toX);
                if (dist > WorldConsts.TILE_WIDTH * mul)
                    this.sprite.setVelocityX(vel);
            }
        });
    }

    setToCollect(target) {

        const velX = this.velocityX;

        this.addUpdateFnAndBindToTarget(FnNames.CTRL_TO_COLLECT, function() {

            let dir = target.getSprite().x > this.x ? 1 : -1;
            let vel = velX * dir;
            this.getSprite().setVelocityX(vel);

            if (this.getSprite().getBounds().contains(target.x, target.y)) {
                this.getSprite().setVelocityX(0);
            }
        });

        this.target.removeUpdateFn(FnNames.CTRL_FOLLOW_PLAYER);
    }
}
export default CollectorCtrl;