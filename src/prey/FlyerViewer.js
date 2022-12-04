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

        let timer = 500;
        let count = 1;
        const fn = function(time, delta) {
            timer -= delta;
            if (timer <= 0) {
                count = (count + 1) > 6 ? 1 : (count + 1);
                timer = 60;
                this.setTexture(`bird${count}`);
            }
        }
        //this.addUpdaterBindSprite(fn);
    }

    addDirectionTracking() {
        const fn = function(time, delta) {
            let flipX = (this.body.velocity.x > 0);
            this.setFlipX(flipX);
        };
        this.addUpdaterBindSprite(fn);
    }
}   
export default Flyerviewer;