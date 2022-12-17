import BaseController from "../classes/BaseController";
import Buildings from "../consts/Buildings";
import FnNames from "../consts/FnNames";
import States from "../consts/States";
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
                this.controller.setToCarryHome(target);
                this.setState(States.CARRYING);
            }
        });

        this.target.removeUpdateFn(FnNames.CTRL_FOLLOW_PLAYER);
    }

    setToCarryHome(target) {
        
        const velX = this.velocityX;

        this.addUpdateFnAndBindToTarget(FnNames.CTRL_CARRY_HOME, function() {

            let pump = this.scene.getBuilding(Buildings.WATER_PUMP);

            let dir = pump.worldX > this.x ? 1 : -1;
            let vel = velX * dir;
            this.getSprite().setVelocityX(vel);

            target.setPosition(this.x, this.getSprite().getTopCenter().y);

            if (this.getSprite().getBounds().contains(pump.worldX, this.y)) {
                this.getSprite().setVelocityX(0);

                this.removeUpdateFn(FnNames.CTRL_CARRY_HOME);
                this.controller.addFollowTracked();
                this.setState(States.NORMAL);
            }
        });

        this.target.removeUpdateFn(FnNames.CTRL_TO_COLLECT);
    }
}
export default CollectorCtrl;