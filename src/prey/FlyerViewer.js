import BaseController from "../classes/BaseController";

class Flyerviewer extends BaseController {

    constructor(prey) {
        super(prey);
        this.model = prey.model;
        this.addFlappingAnimation();
        this.addDirectionTracking();
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
}   
export default Flyerviewer;