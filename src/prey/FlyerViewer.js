import BaseController from "../classes/BaseController";
import Depths from "../consts/Depths";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

class Flyerviewer extends BaseController {

    constructor(prey) {
        super(prey);
        this.model = prey.model;
        this.addFlappingAnimation();
        this.addDirectionTracking();
        this.addSpawnStateChange();
    }

    addFlappingAnimation() {
        this.sprite.anims.play(this.model.animation);
    }

    addDirectionTracking() {
        const fn = function(time, delta) {
            let flipX = (this.body.velocity.x > 0);
            this.setFlipX(flipX);
        };
        this.addUpdateFnAndBindToSprite('directionView', fn);
    }

    addSpawnStateChange() {
        this.addUpdateFnAndBindToTarget(FnNames.VIEW_SPAWN_TO_NORMAL_DEPTH, function(time, delta) {
            if (this.isStateEquals(States.NORMAL)) {
                this.setDepth(Depths.ENEMIES);
                this.removeUpdateFn(FnNames.VIEW_SPAWN_TO_NORMAL_DEPTH);
            }
        });
    }
}   
export default Flyerviewer;