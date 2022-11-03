import BaseController from "../classes/BaseController";

class Flyerviewer extends BaseController {

    constructor(prey) {
        super(prey);
        this.addFlappingAnimation();
    }

    addFlappingAnimation() {
        let timer = 500;
        let count = 1;
        const fn = function(time, delta) {
            timer -= delta;
            if (timer <= 0) {
                count = (count + 1) > 4 ? 1 : (count + 1);
                timer = 60;
                this.setTexture(`fairy${count}`);
            }
        }
        this.addUpdaterBindSprite(fn);
    }
}   
export default Flyerviewer;