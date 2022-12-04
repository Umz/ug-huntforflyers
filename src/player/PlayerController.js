import BaseController from "../classes/BaseController";
import WorldConsts from "../consts/WorldConsts";

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

    get velocityX() { return WorldConsts.BASE_MOVE_SPEED * this.stats.speed }
}
export default PlayerController;