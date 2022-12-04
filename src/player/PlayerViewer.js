import BaseController from "../classes/BaseController";

class Playerviewer extends BaseController {

    constructor(player) {
        super(player);
        this.addDirectionTracking();
    }

    addDirectionTracking() {
        const fn = function(time, delta) {
            let flipX = (this.body.velocity.x > 0);
            this.setFlipX(flipX);
        };
        this.addUpdateFnAndBindToSprite('directionView', fn);
    }
}   
export default Playerviewer;