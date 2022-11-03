import BaseController from "../classes/BaseController";
import WorldConsts from "../WorldConsts";

class PlayerController extends BaseController {

    constructor(player) {
        super(player);
    }

    moveLeft() {
        this.sprite.setVelocityX(-this.velocityX);
    }

    moveRight() {
        this.sprite.setVelocityX(this.velocityX);
    }

    doAction() {
        console.log('Player Controller Action')
    }

    get velocityX() { return WorldConsts.BASE_MOVE_SPEED * this.stats.speed }
}
export default PlayerController;